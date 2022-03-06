const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express  = require("express")
const router = express.Router();
const { check, validationResult} = require("express-validator/check");
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

        user = new userModel({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);


        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_KEY, {
                expiresIn: 3600*24
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        res.status(500).send("Error in Saving");
    }

});

module.exports = router;