import CardBody from "../components/Card/CardBody";
import CustomInput from "../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {LockOutlined} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/loginPage";
import styles1 from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import axios from "axios";
import {setAuthState} from "../redux/actions/auth";
import {connect} from "react-redux";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import {getServer} from "../utils/getServerName";
import setAuthToken from "../utils/setAuthToken";
import {Redirect} from "react-router-dom";
const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(styles1);

const ResetPass = (props) => {
    console.log(props)
    const params = props.location.pathname.split("/")
    const userID = props.match.isExact?props.userInfo._id:params[2]
    const token = props.match.isExact?null:params[3]
    const {reqOldPass} = props;
    const [passwords,setPasswords] = React.useState({});
    const [generalResponse,setGeneralResponse]= React.useState("");
    const [isError,setErrorFlag]= React.useState(false);
    const [passChangeSuccess,setPassChangeSuccess]= React.useState(false);
    const classes = useStyles();
    const classes1 = useStyles1();

    const submit = (e) => {
        if(passwords.newPasswordRep===passwords.newPassword) {
            axios.post(`${getServer()}/changePassword/${userID}/${token}/?forgot=${!reqOldPass}`, passwords)
                .then(response => {
                    if (response.status === 200) {
                        setGeneralResponse(response.data)
                        setErrorFlag(false)
                        localStorage.removeItem("token")
                        setAuthToken(null);
                        props.setAuthState(false)
                        // setPassChangeSuccess(true)

                    }
                })
                .catch(error => {

                        setGeneralResponse(error.response.data)
                        setErrorFlag(true)

                });
        }else{
            setGeneralResponse("Passwords have to be matched")
            setErrorFlag(true)
        }
        e.preventDefault()
        props.history.push("/login")

    }

    if (passChangeSuccess) {
        return <Redirect to={{pathname: "/login"}}/>;
    }
    else
    {

        return(
            <form className={classes.form} onSubmit={(event) => submit(event)}>
                <h6 align="center" style={{color: isError ? "red" : "green"}}>{generalResponse}</h6>
                <CardBody style={{background: reqOldPass ? "white" : "black"}}>
                    <GridContainer justifyContent="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Old Password"
                                id="oldPass"
                                hidden
                                formControlProps={{
                                    style: {display: reqOldPass ? "inline-flex" : "none"},
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
                                    required: reqOldPass,
                                    onChange: (event) => {
                                        setPasswords({...passwords, oldPassword: event.target.value})
                                    },
                                }}

                            />
                            <CustomInput
                                labelText="New Password"
                                id="passNew"
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
                                    required: true,
                                    onChange: (event) => {
                                        setPasswords({...passwords, newPassword: event.target.value})
                                    },
                                }}
                            />
                            <CustomInput
                                labelText="Repeat New Password"
                                id="passNewRep"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                error={passwords.newPasswordRep !== passwords.newPassword}
                                inputProps={{
                                    type: "password",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LockOutlined className={classes1.icons}/>
                                        </InputAdornment>
                                    ),
                                    autoComplete: "off",
                                    required: true,
                                    onChange: (event) => {
                                        setPasswords({...passwords, newPasswordRep: event.target.value})
                                    },
                                }}
                            />

                            <button type="submit">Change</button>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </form>
        )}

}

const mapStateToProps = state => ({
    auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
    setAuthState : authFlag => dispatch(setAuthState(authFlag))
})

export default connect(mapStateToProps,mapDispatchToProps)(ResetPass);