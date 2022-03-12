import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Palette from "@material-ui/icons/Palette";
import Create from "@material-ui/icons/Create";
// core components
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import NavPills from "../components/NavPills/NavPills.js";
import Parallax from "../components/Parallax/Parallax.js";
import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import background from "../assets/img/bg-whale.png";
import {Add, LockRounded, Settings} from "@material-ui/icons";
import {Snackbar, TextField} from "@material-ui/core";
import axios from "axios";
import {Link,Redirect} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {connect} from "react-redux";
import {setNFTs} from "../redux/actions/NFTs";
import {getServer} from "../utils/getServerName";
import ResetPass from "./ResetPass";

const useStyles = makeStyles(styles);

const ProfilePage = (props) =>  {
  const classes = useStyles();
  const { ...rest } = props;
  const userInfo = props.currentUser;
  const auth = props.auth;
  const NFTs = props.NFTs;
  const [dream,setDream] = React.useState("");
  const [response,setResponse] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const getNFTs = async () =>{
      try {
          let res = await axios.get(`${getServer()}/profile`)
          props.setNFTs(res.data.NFTs);
          props.setCurrentUser(res.data.user);
      } catch {

      }
  }

  useEffect( ()=>{
            getNFTs().then(props.history.push("/profile"))

  },[])

  const imagine = (e) => {
      axios.post(`${getServer()}/profile/imagine`, {"dream": dream})
          .then(response => {
              if (response.status === 200) {
                  setDream("")
                  setResponse(response.data.message)
                  setOpen(true);

              }
          })
          .catch(error => {
              console.log(error.response)
              if(error.response.data.message)
                 setResponse(error.response.data.message)
              else
                setResponse("Oops something went wrong please try again!")
              setOpen(true);
          });
      e.preventDefault()
  }

  const dreamHandle = (e) => {
        console.log(e.target.value);
        setDream(e.target.value);
  }

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


  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  if (auth) {
      return (

          <div>


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
                          <h2>Welcome, {userInfo.name?userInfo.name:userInfo.email} </h2>
                          <h5>Your remained daily credits : {userInfo.credits}</h5>
                          <GridContainer justifyContent="center">
                              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                                  <NavPills
                                      onTabClick = {async (event)=>{if(event.target.parentElement.innerText === "MY NFTS"){await getNFTs()}}}
                                      alignCenter
                                      color="primary"
                                      tabs={[
                                          {
                                              tabButton: "Generate NFT",
                                              tabIcon: Add,
                                              tabContent: (
                                                  <GridContainer justifyContent="center">
                                                      <GridItem xs={12} sm={12} md={12}>
                                                          <NavPills
                                                              alignCenter
                                                              color="primary"
                                                              tabs={[
                                                                  {
                                                                      tabButton: "From Text",
                                                                      tabIcon: Create,
                                                                      tabContent: (



                                                                         [ <TextField
                                                                              disabled={!userInfo.credits}
                                                                              id="filled-multiline-static"
                                                                              label={!userInfo.credits?"You exceed your daily quota":"Describe your dream"}
                                                                              placeholder=""
                                                                              minRows={10}
                                                                              maxRows={10}
                                                                              multiline
                                                                              variant={"filled"}
                                                                              fullWidth
                                                                              inputProps={{maxLength: 500, onChange : (event)=>dreamHandle(event)}}
                                                                              value={dream}


                                                                          />,
                                                                         <Button disabled={!userInfo.credits} onClick={(event)=>{imagine(event)}}> Create </Button>]

                                                                         )
                                                                  },

                                                                  // {
                                                                  //     tabButton: "From Image",
                                                                  //     tabIcon: ImageOutlined,
                                                                  //     tabContent: (
                                                                  //         <GridContainer justifyContent="center">
                                                                  //             <GridItem xs={0} sm={12} md={1}/>
                                                                  //             <GridItem xs={12} sm={12} md={4}>
                                                                  //                 <Input type="file"/>
                                                                  //                 <Button> Upload! </Button>
                                                                  //             </GridItem>
                                                                  //         </GridContainer>
                                                                  //     )
                                                                  // },
                                                              ]}
                                                          />
                                                      </GridItem>
                                                  </GridContainer>
                                              ),
                                          },
                                          {
                                              tabButton: "My NFTs",
                                              tabIcon: Palette,
                                              tabContent: (
                                                  <GridContainer justifyContent="center">


                                                          {React.Children.toArray(NFTs?.map((nft) =>(
                                                              <GridItem  xs={12} sm={6} md={3}>
                                                                  <Link to={{ pathname:`${props.match.path}/myNfts/${nft._id}`}}>
                                                             <img
                                                                  key={nft._id}
                                                                  title={nft.dream}
                                                                  src={nft.url}
                                                                  alt={nft.name}
                                                                  className={navImageClasses}
                                                              />
                                                                  </Link>



                                                              </GridItem>
                                                          )))

                                                          }

                                                  </GridContainer>
                                              ),
                                          },
                                          {
                                              tabButton: "Settings",
                                              tabIcon: Settings,
                                              tabContent: (
                                                  <GridContainer justifyContent="center">
                                                      <GridItem xs={12} sm={12} md={4}>
                                                          <NavPills
                                                              alignCenter
                                                              color="primary"
                                                              tabs={[
                                                                  {
                                                                      tabButton: "Password",
                                                                      tabIcon: LockRounded,
                                                                      tabContent: (

                                                          <ResetPass {...props} userInfo={userInfo} reqOldPass={true} />
                                                                          )}]
                                                                }
                                                              />
                                                      </GridItem>
                                                  </GridContainer>
                                              ),
                                          },
                                      ]}
                                  />
                              </GridItem>
                          </GridContainer>
                      </div>
                  </div>
              </div>
              <Footer/>
              <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message={response}
                  action={action}
              />









          </div>

      );
  }
  else{
      return (
          <Redirect to={"/login"}/>
      )
  }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    auth: state.auth.auth,
    NFTs: state.NFTs.myNFTs,
})

const mapDispatchToProps = dispatch => ({
    setNFTs : myNFTs => dispatch(setNFTs(myNFTs)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);