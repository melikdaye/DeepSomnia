const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const nftModel = require("../models/nftModel")
const userModel = require("../models/userModel")
const { isEmpty } = require("lodash");
const mongoose = require('mongoose');
const {json} = require("express");
const AWS = require("aws-sdk");
const axios = require('axios');
const FormData = require('form-data');
const {body} = require("express-validator");
const bcrypt = require("bcryptjs");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

router.post("/:id/editName/:name",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){
            if(req.params.name) {
                nft.name = req.params.name;
                await nft.save()
                return res.sendStatus(200);
            }
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }


})

router.post("/:id/editDescription/:description",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){
            if(req.params.description) {
                nft.description = req.params.description;
                await nft.save()
                return res.sendStatus(200);
            }
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})

router.post("/:id/addAttribute",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){
            if(req.body) {
                nft.attributes.push(req.body);
                await nft.save()
                return res.sendStatus(200);
            }
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})

router.post("/:id/delAttribute/:index",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){

               nft.attributes.splice(req.params.index,1);
               await nft.save()
               return res.sendStatus(200);

        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})



router.post("/:id/pinPinata",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        const user = await userModel.findById(req.user.id)
        if(nft.url){
            if(req.body.jwt || user.pinataJWT) {



                if(req.body.saveJWT){
                    const salt = await bcrypt.genSalt(10);
                    user.pinataJWT = await bcrypt.hash(req.body.jwt, salt);
                    user.save()
                }

                let data = new FormData();
                const s3 = new AWS.S3()
                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION
                })
                let bucket_prefix = process.env.AWS_URL_PREFIX
                const awsParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: nft.url.split(bucket_prefix)[1]};
                console.log(awsParams)


                let readStream = null;

                readStream = s3.getObject(awsParams).createReadStream();
                console.log(readStream)

                data.append('file', readStream,{
                    filename : awsParams.Key
                });
                const metadata = JSON.stringify({
                        name: nft.name,
                    }
                );
                console.log(data)
                data.append('pinataMetadata', metadata);
                const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
                axios.post(url, data, {
                        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                            'Authorization': `Bearer ${req.body.jwt}`,
                        }
                    })
                    .then(function (response) {
                        console.log(response)
                        nft.IPFSResponse = response.data;
                        nft.external_url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
                        nft.save()
                        const metadata = {};
                        metadata.name = nft.name;
                        metadata.image = nft.external_url;
                        metadata.description = nft.description;
                        metadata.attributes = nft.attributes;
                        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
                        axios.post(url, metadata, {
                            headers: {
                                'Authorization': `Bearer ${req.body.jwt}`,
                            }
                        })
                            .then(function (response) {
                                console.log(response)
                                nft.metadataUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
                                nft.save()
                                return res.status(200).json({nft})
                            })
                            .catch(function (error) {
                                console.log(error)
                                //handle error here
                            });

                          // return res.status(200).json({nft})
                    })
                    .catch(function (error) {
                        console.log(error)
                        //handle error here
                    });

            }
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})


router.post("/:id/updateMeta",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft.url){

                const s3 = new AWS.S3()
                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION
                })
                let bucket_prefix = process.env.AWS_URL_PREFIX
                const metadata = {};
                metadata.name = nft.name;
                metadata.image = nft.url;
                metadata.description = nft.description;
                metadata.attributes = nft.attributes;

                let jsonFileName = nft.url.split(bucket_prefix)[1].replace("jpg","json")
                let jsonData = Buffer.from(JSON.stringify(metadata));
                console.log(jsonData)
                console.log(jsonFileName)
                let data = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: jsonFileName,
                    Body: jsonData,
                    ContentEncoding: 'base64',
                    ContentType: 'application/json',
                    ACL: 'public-read'
                };

                let nftData = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key : nft.url.split(bucket_prefix)[1],
                    ACL: 'public-read',
                }

                s3.putObjectAcl(nftData,function (err, nftData){
                    if (err) {
                        console.log(err);
                        console.log('Error updating acl : ', nftData);
                        return res.sendStatus(400);
                    } else {
                            s3.upload(data, function (err, data) {
                            if (err) {
                                console.log(err);
                                console.log('Error uploading data: ', data);
                                return res.sendStatus(400);
                            } else {
                                nft.metadataUrl = `${bucket_prefix}${jsonFileName}`
                                nft.save()
                                return res.status(200).json({nft})
                            }
                        });
                    }
                })
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})

router.get("/:id",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){
            return res.status(200).json({nft})
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})

router.post("/addTxHash/:id",auth,async (req,res) => {
    try {

        const nftID = req.params.id
        const nft = await nftModel.findById(nftID);
        if(nft){
            nft.txHash = req.body.txHash;
            nft.save()
            return res.status(200).json({nft})
        }
        else{
            return res.sendStatus(404);
        }

    } catch (err) {
        res.sendStatus(500);
    }

})


module.exports = router;