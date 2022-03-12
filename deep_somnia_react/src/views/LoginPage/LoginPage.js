import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import axios from 'axios';
import image from "assets/img/bg-login.png";
import {LockOutlined} from "@material-ui/icons";
import styles1 from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {Redirect} from "react-router-dom";
import setAuthToken from "utils/setAuthToken";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/actions/user";
import {setAuthState} from "../../redux/actions/auth";
import Register from "./Sections/register";
import Reset from "./Sections/resetPassword";
import GoogleLogin from "react-google-login";
import {getServer} from "../../utils/getServerName";
const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(styles1);


const viewTransitions ={
    0:{
        button1: "Sign Up",
        text1 : "Don't have an account yet ?",
        button2: "Reset it",
        text2 : "Forget your password ?",
        val1 : 1,
        val2 :2,
    },
    1:{
        button1: "Sign in",
        text1 : "Already have an account ?",
        button2: "Reset it",
        text2 : "Forget your password ?",
        val1 : 0,
        val2 :2,
    },
    2:{
        button1: "Sign Up",
        text1 : "Don't have an account yet ?",
        button2: "Sign in",
        text2 : "Already have an account ?",
        val1 : 1,
        val2 :0,
    }
}


const LoginView = (props) => {

    const classes1 = useStyles1();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [password,setPassword] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [error,setError] = React.useState(false);
    const [viewState,setViewState] = React.useState(0);
    const [generalResponse,setGeneralResponse]= React.useState("");

    const passwordHandle = (e) => {
       setPassword(e.target.value);
    }
    const usernameHandle = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const submit = (e,type) => {
      axios.post(`${getServer()}/${type}`, {"email": email, "password": password})
              .then(response => {
                  if (response.status === 200) {
                      setEmail("");
                      setPassword("");
                      localStorage.setItem("token",response.data.token);
                      if (localStorage.token) {
                          setAuthToken(localStorage.token);
                      }
                      props.setCurrentUser(response.data.user);
                      props.setAuthState(true);
                      setError(false);


                  }
              })
              .catch(error => {
                  setError(true);
                  setGeneralResponse(error.response.data.message)
              });
            e.preventDefault()
      }

      const responseSuccessGoogle = (response) =>{
        console.log(response)
          axios.post(`${getServer()}/auth/googleLogin`,{tokenID:response.tokenId}).then(response => {
              if (response.status === 200) {
                  console.log(response.data);

                  localStorage.setItem("token",response.data.token);
                  if (localStorage.token) {
                      setAuthToken(localStorage.token);
                  }
                  props.setCurrentUser(response.data.newUser);
                  props.setAuthState(true);

              }
          })
              .catch(error => {

                  console.log(error);
              });

      }
    const responseFailGoogle = (response) =>{
        console.log(response)
    }

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    if(props.auth) {
        return (<Redirect to="/profile"/>)
    }
    else {
        return (
            <div>

                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justifyContent="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card className={classes[cardAnimaton]}>
                                    {(() => {
                                        switch (viewState){
                                            case 0:
                                            default:
                                                return(
                                                    <form className={classes.form} onSubmit={(event) => submit(event, "auth/login")}>
                                                        <h4 align="center">Login</h4>
                                                        <h6 align="center" style={{color:"red"}}>{generalResponse}</h6>
                                                        <CardBody>
                                                            <CustomInput
                                                                labelText="Email"
                                                                id="email"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "email",
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <Email className={classes.inputIconsColor}/>
                                                                        </InputAdornment>

                                                                    ),
                                                                    onChange: (event) => usernameHandle(event),
                                                                    autoComplete: "on",
                                                                    value: email,
                                                                }}
                                                                white={false}
                                                                error={error}
                                                            />
                                                            <CustomInput
                                                                labelText="Password"
                                                                id="pass"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "password",
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <LockOutlined className={classes1.icons}/>
                                                                        </InputAdornment>
                                                                    ),
                                                                    autoComplete: "off",
                                                                    onChange: (event) => passwordHandle(event),
                                                                    value: password
                                                                }}
                                                                error={error}
                                                            />
                                                            <button type="submit" hidden>Submit</button>
                                                        </CardBody>
                                                        <div className={classes.socialLine}>

                                                            <GoogleLogin
                                                                clientId={window.env.GOOGLE_API_CLIENT_ID}
                                                                render={(renderProps) => (
                                                                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} type="button" className={classes[".login-with-google-btn"]} >
                                                                        Sign in with Google
                                                                    </Button>
                                                                )}
                                                                buttonText="Login"
                                                                cookiePolicy={'single_host_origin'}
                                                                onFailure={responseFailGoogle}
                                                                onSuccess={responseSuccessGoogle}

                                                            >
                                                            </GoogleLogin>,
                                                        </div>
                                                    </form>

                                                )
                                            case 1:
                                                return ( <Register/>)
                                            case 2:
                                                return (<Reset/>)
                                        }
                                    })()}

                                        <CardFooter className={classes.cardFooter}>
                                            <div className={classes.socialLine}>
                                            <row>
                                                <h4>{viewTransitions[viewState].text1}</h4>
                                                <h4>{viewTransitions[viewState].text2}</h4>

                                            </row>
                                            </div>
                                            <div className={classes.socialLine}>
                                            <row>
                                                <Button simple color="primary" size="lg"
                                                        onClick={() => setViewState(viewTransitions[viewState].val1)}>
                                                    {viewTransitions[viewState].button1}
                                                </Button>
                                                <Button simple color="primary" size="lg"
                                                        onClick={() => setViewState(viewTransitions[viewState].val2)}>
                                                    {viewTransitions[viewState].button2}
                                                </Button>
                                            </row>
                                            </div>
                                        </CardFooter>


                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <Footer whiteFont/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
   setCurrentUser : user => dispatch(setCurrentUser(user)),
    setAuthState : authFlag => dispatch(setAuthState(authFlag))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginView);