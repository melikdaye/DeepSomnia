import React, {useEffect, useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Parallax from "../components/Parallax/Parallax.js";
import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import background from "../assets/img/bg-whale.png";
import {
    ExpandMore,
    AddBoxRounded,
    EditOutlined,
    SaveOutlined,
    CancelOutlined,
    DeleteOutlined,
    CloudDownloadOutlined,
    SaveAltOutlined,
    CloudUploadOutlined,
    InfoOutlined,
    ArrowBackOutlined, MonetizationOnOutlined, HelpOutlined
} from "@material-ui/icons";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, CardContent, Card,
    TextField,
    Typography, Checkbox, FormControlLabel, Select, FormControl, MenuItem, Snackbar, Button, Tooltip
} from "@material-ui/core";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {selectNFTbyID} from "../redux/selectors/nftSelector";
import {
    addAttributeNFTByID,
    deleteAttributeNFTByID,
    setDescriptionOfNFTByID,
    setNameOfNFTByID, updateNFTByID
} from "../redux/actions/NFTs";

import Modal from "../components/Modal/Modal";
import {saveAs} from "file-saver";
import CloseIcon from "@material-ui/icons/Close";
import ReactJson from "react-json-view";
import {connectWallet, getCurrentWalletConnected,mintNFT} from "../utils/metaMask";
import {getServer} from "../utils/getServerName";
const useStyles = makeStyles(styles);



const NftPage = (props) =>  {

    const classes = useStyles();
    const { ...rest } = props;
    const auth = props.auth;
    const nftProp = props.nftProp;
    const [editOpen,setEditOpen] = React.useState(false);
    const [name,setNFTName] = React.useState(nftProp.name);
    const [isOpen, setIsOpen] = useState(false);
    const [description,setNFTDescription] = React.useState(nftProp.description);
    const [IPFS,setIPFS] = React.useState("Pinata");
    const [IPFSUsage,setIPFSUsage] = React.useState(true);
    const [response,setResponse] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openAddAttrb, setOpenAddAttrb] = React.useState(false);
    const [openIPFSUpload, setOpenIPFSUpload] = React.useState(false);
    const [openMintNFT, setOpenMintNFT] = React.useState(false);
    const [walletAddress, setWallet] = useState("");
    const [walletStatus, setWalletStatus] = useState("");



    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setWalletStatus("👆🏽 Write a message in the text-field above.");
                } else {
                    setWallet("");
                    setWalletStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setWalletStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    useEffect( () => {
        async function checkWalletConnection() {
            const {address, status} = await getCurrentWalletConnected();
            setWallet(address)
            setWalletStatus(status);
            addWalletListener();
        }
        checkWalletConnection();
    }, []);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const handleEdit = () =>{
        setEditOpen(!editOpen);
        if (editOpen){
            setNFTName(nftProp.name)
            setNFTDescription(nftProp.description?nftProp.description:"")
        }
    }

    const saveText = () =>{
        let valError = false;
        if(nftProp.name !== name){
            axios.post(`${getServer()}/nft/${nftProp._id}/editName/${name}`).then(r => {
                    if (r.status === 200) {
                        props.setNftName(nftProp._id,name);
                    }
                    else{
                        valError = true;
                    }
                }
            )
        }
        if(nftProp.description !== description){
            axios.post(`${getServer()}/nft/${nftProp._id}/editDescription/${description}`).then(r => {
                    if (r.status === 200) {
                        props.setNftDescription(nftProp._id,description);
                    }
                    else{
                        valError = true;
                    }
                }
            )

        }
        if(!valError)
            setEditOpen(!editOpen);
        else
            console.log("error")
    }

    const saveAttrib = (e) =>{
        let attrb = {
            trait_type : document.getElementById("trait_type").value,
            display_type : document.getElementById("display_type").value,
            value : document.getElementById("value").value,
        }
        axios.post(`${getServer()}/nft/${nftProp._id}/addAttribute`,attrb).then(r => {
                if (r.status === 200) {
                    props.addNftAttribute(nftProp._id,attrb)
                    setIsOpen(false)
                }
                else{
                    console.log("error")
                }
            }
        )


    }

    const deleteAttrb = (e) =>{
        let index = e.currentTarget.id;
        axios.post(`${getServer()}/nft/${nftProp._id}/delAttribute/${index}`).then(r => {
                if (r.status === 200) {
                    props.delNftAttribute(nftProp._id,index)
                }
                else{
                    console.log("error")
                }
            }
        )
    }
    const saveImage = () =>{
        saveAs(nftProp.url, nftProp.name||nftProp._id) // Put your image url here.
    }

    const fillAttributes = () =>{
        return(

                <GridItem xs={12} sm={12} md={4} >
                    <TextField id="trait_type" label="Trait Type" variant="standard"/>
                    <TextField id="display_type" label="Display Type" variant="standard"/>
                    <TextField id="value" label="Value" variant="standard"/>
                    <IconButton aria-label="save" color="primary" onClick={(e) => {saveAttrib(e)}}>
                        <h6>Save</h6><SaveOutlined/>
                    </IconButton>
                </GridItem>

        )
    }

    const pinImage = () =>{
        if(IPFSUsage) {
            switch (IPFS) {
                case "Pinata":
                    let jwt = document.getElementById("jwtKey").value
                    let saveJWT = document.getElementById("saveJWT").checked;
                    axios.post(`${getServer()}/nft/${nftProp._id}/pinPinata`, {jwt, saveJWT}).then(r => {
                            if (r.status === 200) {
                                setResponse("Image pinned successfully!")
                                setOpen(true);
                                setOpenIPFSUpload(false);
                                props.updateNft(r.data.nft)
                            } else {
                                setResponse("Oops something went wrong please try again!")
                                setOpen(true);
                            }
                        }
                    )
            }
        }
        else{
            axios.post(`${getServer()}/nft/${nftProp._id}/updateMeta`).then(r => {
                    if (r.status === 200) {
                        setResponse("Metadata is updated successfully!")
                        setOpen(true);
                        props.updateNft(r.data.nft)
                    } else {
                        setResponse("Oops something went wrong please try again!")
                        setOpen(true);
                    }
                }
            )
        }
    }

    const selectIPFS = () =>{
        return(
            <GridContainer justifyContent="center">
                <GridItem xs={8} sm={8} md={8} >
                    <FormControl disabled={!IPFSUsage}>
                    <Select value={IPFS} onChange={(e)=>{console.log(e.target.value);setIPFS(e.target.value)}}>
                        <MenuItem value={"Pinata"}>Pinata</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControlLabel id="noIPFS"  onChange={(e)=>{setIPFSUsage(!e.target.checked)}} control={<Checkbox />} label="I dont have any IPFS account" />
                    <TextField disabled={!IPFSUsage} type="password"  id="jwtKey" label="JWT Key" variant="standard"/>
                    <FormControlLabel disabled={!IPFSUsage} id="saveJWT"  control={<Checkbox />} label="Save JWT for later use" />
                    <Tooltip title="Please fill name and description fields for image" placement="right-start">
                        <span>
                    <Button  disabled={(nftProp.name === "" && nftProp.description === "")} variant="outlined" color="primary" onClick={pinImage}>{IPFSUsage?`Pin Image to ${IPFS}`:"Update Only Metadata"}</Button>
                        </span>
                    </Tooltip>
                </GridItem>

            </GridContainer>
        )
    }


    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setWalletStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    const createNFT = () =>{
        return(

        <GridContainer justifyContent="center">
            {nftProp.txHash?
                (
                    <a style={{display: "table-cell"}} target="_blank" href={"https://rinkeby.etherscan.io/tx/" + nftProp.txHash}>See details of your NFT transaction on Etherscan</a>
                )

                :[
            <GridItem xs={8} sm={8} md={12}>

                <Button variant="contained" onClick={connectWalletPressed}>{walletAddress.length > 0 ? (
                    "Connected to MetaMask Wallet: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                ) : (
                    <span>Connect Your  🦊{" "} MetaMask Wallet</span>
                )}</Button>
            </GridItem>,
            <GridItem xs={8} sm={8} md={6}>
                <Button color="primary" variant="contained"

                        disabled={walletAddress.length === 0 || (nftProp.name === "" || nftProp.description === "" || nftProp.metadataUrl === "")}
                        onClick={onMintPressed} title="Before create NFT name and description fields must be filled">Create NFT</Button>


            </GridItem>
                ]}
        </GridContainer>

        )
    }

    const onMintPressed = async () => {
        const { status, txHash } = await mintNFT(nftProp.metadataUrl);
        axios.post(`${getServer()}/nft/addTxHash/${nftProp._id}`,{txHash}).then(r => {
                if (r.status === 200) {
                    props.updateNft(r.data.nft)
                }
                else{

                }
            }
        )
        setResponse(status);
        setOpen(true);
    };





    const [modalChildren,setModalChildren] = React.useState(fillAttributes())
    const [showIPFS,showIPFSInfo] = React.useState(false)
    if (auth) {
        return (

            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={response}
                    action={action}
                />
                <Header
                    color="transparent"
                    brand="Deep Somnia"
                    rightLinks={<HeaderLinks link="/logout"/>}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "white",
                    }}
                    {...rest}
                />
                <Parallax
                    small
                    filter
                    image={background}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justifyContent="flex-start">
                                <GridItem xs={12} sm={12} md={12} style={{marginBottom:"-5%",marginLeft:"-2%",marginTop:"-2%"}}>
                                    <Link to="/profile">
                                <IconButton aria-label="back" color="primary"  title="Back to My Profile">
                                     <ArrowBackOutlined/><h6>My Profile</h6>
                                </IconButton>
                                    </Link>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} className={classes.imageCard}>
                                        <img
                                            key={nftProp._id}
                                            title={nftProp.dream}
                                            src={nftProp.url}
                                            alt={nftProp.name}
                                            width="300"
                                            height="300"
                                        />
                                    <GridContainer justifyContent="center">
                                        <GridItem xs={12} sm={12} md={8} className={classes.underImageGroup}>
                                    <IconButton aria-label="saveImage" color="primary" onClick={saveImage} title="Download Image">
                                        <CloudDownloadOutlined/>
                                    </IconButton>
                                    <IconButton aria-label="save" color="primary" onClick={(e) => {saveAttrib(e)}} title="Download Attributes as JSON">
                                       <SaveAltOutlined/>
                                    </IconButton>
                                    <IconButton aria-label="save" color="primary" onClick={(e) => {setOpenIPFSUpload(!openIPFSUpload)}} title="Upload file to IPFS">
                                        <CloudUploadOutlined/>
                                    </IconButton>
                                    <IconButton disabled={nftProp.external_url===""} aria-label="save" color="primary" onClick={(e) => {showIPFSInfo(!showIPFS)}} title="Show IpfsHash">
                                                    <InfoOutlined/>
                                    </IconButton>
                                            <IconButton  aria-label="save" color="primary" onClick={(e) => {setOpenMintNFT(!openMintNFT)}} title="Create NFT from Image">
                                                <MonetizationOnOutlined/>
                                            </IconButton>
                                            <IconButton  aria-label="save" color="primary" onClick={(e) => {setIsOpen(true)}} title="F.A.Q">
                                                <HelpOutlined/>
                                            </IconButton>
                                        </GridItem>
                                        <ReactJson style={{display:showIPFS?"inline-block":"none"}} src={nftProp.IPFSResponse}  theme={"rjv-default"} displayDataTypes={false} displayObjectSize={false} collapsed={false} enableEdit={false} enableAdd={false} enableDelete={false}/>
                                        {openIPFSUpload&&selectIPFS()}
                                        {openMintNFT&&createNFT()}
                                    </GridContainer>

                                </GridItem>

                                <GridItem xs={11} sm={12} md={8} className={classes.dream}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Dream</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>

                                            {nftProp.dream}

                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <GridItem xs={12} sm={12} md={12} className={classes.dream}>
                                    <TextField value={name} id="name" label="Name your image" variant="standard" disabled={!editOpen} onChange={(e)=>{setNFTName(e.target.value)}}/>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className={classes.dream}>
                                    <TextField  value={description} fullWidth id="description" label="Add description to your image" variant="standard" disabled={!editOpen} onChange={(e)=>{setNFTDescription(e.target.value)}}>
                                    </TextField>
                                        <FormControlLabel onChange={(e)=>{e.target.checked?setNFTDescription(nftProp.dream):(setNFTDescription(""))}} disabled={!editOpen} control={<Checkbox />} label="Use dream as description" />
                                    </GridItem>
                                    <GridContainer justifyContent="flex-end">
                                    <GridItem xs={12} sm={4} md={4} className={classes.editSave} >
                                        <IconButton aria-label="edit" color="primary" onClick={handleEdit}>
                                           <h6>  {editOpen ? "Cancel" : "Edit"}</h6> {editOpen ?<CancelOutlined/> :<EditOutlined/>}
                                        </IconButton>
                                        <IconButton aria-label="save" color="primary" disabled={!editOpen} onClick={saveText}>
                                            <h6>Save</h6><SaveOutlined/>
                                        </IconButton>
                                    </GridItem>
                                    </GridContainer>
                                    <GridContainer justifyContent="flex-start" className={classes.attrbGrid}>
                                        <IconButton aria-label="addAttrib" color="primary" onClick={() => {setOpenAddAttrb(!openAddAttrb)}}>
                                            <h6>Add Attribute</h6><AddBoxRounded/>
                                        </IconButton>



                                    </GridContainer>
                                    {openAddAttrb&&fillAttributes()}
                            <GridContainer>
                                    {React.Children.toArray(nftProp.attributes?.map((attribute,i) => (
                                        <GridItem xs={12} sm={6} md={3} className={classes.attributeContainer}>
                                            <Card className={classes.attributeCard} onMouseOver={()=>{document.getElementById(i).style.display="inline-block"}} onMouseOut={()=>{document.getElementById(i).style.display="none"}}>
                                                <CardContent className={classes.navWrapper}>
                                                    <h4 className={classes.attrCardHeader}>{attribute?.trait_type||"Property"}</h4>
                                                    <h5>{attribute?.value}</h5>
                                                    <IconButton aria-label="delete"  className={classes.delAttrb} id={i} onClick={(e)=>{deleteAttrb(e)}}>
                                                        <DeleteOutlined/>
                                                    </IconButton>
                                                </CardContent>
                                            </Card>
                                        </GridItem>
                                    )))
                                    }
                            </GridContainer>
                                </GridItem>
                            </GridContainer>
                            <Modal children={modalChildren} handleClose={() => setIsOpen(false)} isOpen={isOpen}>

                            </Modal>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
    else{
        return (
            <Redirect to={"/login"}/>
        )
    }
}

const mapStateToProps = (state,ownProps) => ({
    currentUser: state.user.currentUser,
    auth: state.auth.auth,
    nftProp : selectNFTbyID(state.NFTs)(ownProps.match.params.id)
})

const mapDispatchToProps = dispatch => ({
    setNftName : (id,name) => dispatch(setNameOfNFTByID(id,name)),
    setNftDescription : (id,description) => dispatch(setDescriptionOfNFTByID(id,description)),
    addNftAttribute : (id,attrb) => dispatch(addAttributeNFTByID(id,attrb)),
    delNftAttribute : (id,index) => dispatch(deleteAttributeNFTByID(id,index)),
    updateNft : (nft) => dispatch(updateNFTByID(nft))
})

export default connect(mapStateToProps,mapDispatchToProps)(NftPage);