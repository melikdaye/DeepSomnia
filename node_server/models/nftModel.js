const mongoose = require("mongoose");
const AWS = require('aws-sdk')
require("dotenv").config()

const nftSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    dream: {
        type: String,
        required: false,
        default:""
    },
    url : {
        type: String,
        required : false,
        default : ""
    },
    external_url:{
        type : String,
        required : false,
        default : ""
    },
    name : {
        type : String,
        required : false,
        default : ""
    },
    description : {
        type : String,
        required : false,
        default : ""
    },
    attributes : {
        type : Array,
        default : []
    },
    metadataUrl:{
        type: String,
        required: false,
        default: ""
    },
    txHash:{
        type: String,
        required: false,
    },
    IPFSResponse : {
        type : Object,
        required : false,
        default : {}
    },
    isReady : {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

nftSchema.methods.toJSON = function() {
    let obj = this.toObject();
    if(obj.url !== "") {
        let bucket_prefix = process.env.AWS_URL_PREFIX
        const s3 = new AWS.S3()
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
        const myBucket = process.env.AWS_BUCKET_NAME
        const signedUrlExpireSeconds = 60 * 60
        obj.url = s3.getSignedUrl('getObject', {
            Bucket: myBucket,
            Key: obj.url.split(bucket_prefix)[1],
            Expires: signedUrlExpireSeconds
        });
    }

    return obj;
}




module.exports = mongoose.model("NFTs", nftSchema);