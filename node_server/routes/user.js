const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const express  = require("express")
const router = express.Router();
const { check, validationResult} = require("express-validator/check");
const Token = require("../models/tokenModel");
const  {nanoid} = require("nanoid");
const sendEmail = require("../utils/mailEngine");
const {getNodeServerName,getClientServerName} = require("../utils/domainName");
require("dotenv").config()

router.post('/register', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        let user = await userModel.findOne({
            email: email
        });

        if (user) {
            console.log("User Already Exists");
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        let name = `${firstName} ${lastName}`
        user = new userModel({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);


        await user.save();

        let token = await new Token({
            userId: user._id,
            token: nanoid(64),
        }).save();
        const message = `${getNodeServerName(req)}/verify/${user.id}/${token.token}`;
        await sendEmail(user.email, "Verify Email", message);
        res.send("An Email sent to your account please verify");
    } catch (err) {
        res.status(500).send("Ooops something went wrong! ");
    }

});

router.get("/verify/:id/:token",async (req,res)=> {
    console.log(req)
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
        console.log(Date.now() - token.createdAt)
        if ((Date.now() - token.createdAt) > 5 * 60 * 1000) {
            await Token.findByIdAndRemove(token._id);
            return res.status(400).send("Link is expired");
        }
        else {
            await userModel.updateOne({_id: user._id}, {$set: {isVerified: true}});
            await Token.findByIdAndRemove(token._id);
            res.send("Email verified sucessfully");
        }
    } catch (error) {
        res.status(400).send("An error occured");
    }

})

router.post("/resetPassword",async (req,res)=> {
    console.log(req.body)
    try {
        const email = req.body.email
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send("We have never registered this email in our database");
        }
        let token = await new Token({
            userId: user._id,
            token: nanoid(64),
        }).save();
        const message = `${getClientServerName(req)}/resetPassWord/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password Reset Connection", message);
        res.send("An Email sent to your account to reset password");

    }
    catch (error){
        res.status(500).send("Ooops something went wrong! ");
    }

})

router.post("/changePassword/:id/:token",[
    check("newPassWord", "Please enter a valid password").isLength({
        min: 6
    })
    ],async (req,res)=> {

    console.log(req.params)
    console.log(req.body)
    console.log(req.query)
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid User");
        if (req.query.forgot === 'true'){

            const token = await Token.findOne({
                userId: user._id,
                token: req.params.token,
            });
            if (!token) return res.status(400).send("Invalid link");
            console.log(Date.now() - token.createdAt)
            if ((Date.now() - token.createdAt) > 15 * 60 * 1000) {
                await Token.findByIdAndRemove(token._id);
                return res.status(400).send("Link is expired");
            }

            await Token.findByIdAndRemove(token._id);



        }else{
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        user.save()
        res.send("Password is changed successfully");
    }
    catch (error){
        res.status(500).send("Ooops something went wrong! ");
    }

})

module.exports = router;