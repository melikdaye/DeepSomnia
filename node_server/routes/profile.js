const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const nftModel = require("../models/nftModel")
const userModel = require("../models/userModel")
const { isEmpty } = require("lodash");
const {send_dream} = require("../utils/mqtt_client")
const mongoose = require('mongoose');
const {json} = require("express");


router.get("/",auth,async (req,res) => {
    try {
        const userId = req.user.id;
        const NFTs = await nftModel.find({ userId });
        const user = await userModel.findById(userId);
        if (user.credits===0) {
            console.log(user.lastCreation)
            if (user.lastCreation) {
                if ((Date.now() - user.lastCreation) > 86400 * 1000) {
                    user.credits = 1;
                    await user.save();
                }
            }
        }
        if (isEmpty(NFTs)) {
            return res.send({ NFTs: [] ,user});
        }
        else{
            return res.status(200).json({NFTs,user})
        }
    } catch (err) {
        res.send(500);
    }


})

router.post("/imagine",auth,async (req,res) => {
    let nft;
    try {
        const userId = req.user.id;
        const {dream} = req.body;
        console.log(dream)
        console.log(userId)
        let user = await userModel.findById(userId)
        let objectID = mongoose.Types.ObjectId(userId)
        if (dream.length > 6 && user.credits>0) {
            try {
                nft = new nftModel({"userId":objectID,"dream":dream
                });
                await nft.save()
                send_dream(req.app.get("client"), nft.id, dream)
                user.lastCreation = Date.now();
                user.credits-=1;
                await user.save()
                return res.status(200).send({message: "Creation is started and it will be ready in 5-15 minutes"})
            }
            catch(err){
                console.log(err)
                return res.sendStatus(500)
            }


        }
        else{
            return res.status(400).send({message: "Your text is so short or your have exceeded your daily quota"})
        }

    } catch (err) {
        res.send(500);
    }


})
module.exports = router;