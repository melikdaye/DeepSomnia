const express = require("express");
const {check, validationResult} = require("express-validator/check");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const {OAuth2Client} = require("google-auth-library")
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/mailEngine");
const  {nanoid} = require("nanoid");
const {getNodeServerName} = require("../utils/domainName");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_API_CLIENT_ID);


router.get("/", auth, async (req, res) => {
    console.log("get login")
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/login', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {

            let user = await userModel.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            if(!user.isVerified){
                let token = await new Token({
                    userId: user._id,
                    token: nanoid(64),
                }).save();

                const message = `${getNodeServerName(req)}/verify/${user.id}/${token.token}`
                await sendEmail(user.email, "Verify Email", message);
                return res.status(400).json({
                    message: "An Email sent to your account please verify"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_KEY,
                {
                    expiresIn: 3600*24
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,user
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

router.post('/googleLogin', async (req, res) => {
        const {tokenID} = req.body;
        console.log(tokenID);
        client.verifyIdToken({
            idToken:tokenID,
            audience: process.env.GOOGLE_API_CLIENT_ID
        }).then(response => {
            const {email_verified, name, email} = response.payload;
            if(email_verified){
                userModel.findOne({email}).exec(async (err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Something went wrong",
                        })
                    } else {
                        if (user) {
                            const payload = {
                                user: {
                                    id: user.id
                                }
                            };

                            jwt.sign(
                                payload,
                                process.env.JWT_KEY,
                                {
                                    expiresIn: 3600 * 24
                                },
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(200).json({
                                        token, newUser:user
                                    });
                                }
                            );
                        } else {
                            let password = email + process.env.JWT_KEY;
                            let newUser = new userModel({
                                name,
                                email,
                                password,

                            });

                            const salt = await bcrypt.genSalt(10);
                            newUser.password = await bcrypt.hash(password, salt);


                            await newUser.save();

                            const payload = {
                                user: {
                                    id: newUser.id
                                }
                            };

                            jwt.sign(
                                payload,
                                process.env.JWT_KEY, {
                                    expiresIn: 3600 * 24
                                },
                                (err, token) => {
                                    if (err) throw err;
                                    console.log(token,newUser)
                                    res.status(200).json({
                                        token,newUser
                                    });
                                }
                            );
                        }
                    }
                })
            }
            console.log(email_verified, name, email);
        });
    }
);
module.exports = router;