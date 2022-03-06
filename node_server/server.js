const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const user  = require("./routes/user")
const auth  = require("./routes/auth")
const profile  = require("./routes/profile")
const nft  = require("./routes/nft")
const mongoose = require("mongoose");
require("dotenv").config()
const {get_client} = require("./utils/mqtt_client")

app.use(cors());
mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
});

client = get_client()
app.set("client",client)

app.use(bodyParser.json());
app.use("/",user);
app.use("/auth",auth);
app.use("/profile",profile);
app.use("/nft",nft);


app.listen(5000, () => {
    console.log("Server running successfully on 5000");
});