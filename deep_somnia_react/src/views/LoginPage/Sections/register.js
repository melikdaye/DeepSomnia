import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import {LockOutlined} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import styles1 from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import axios from "axios";
import {setCurrentUser} from "../../../redux/actions/user";
import {setAuthState} from "../../../redux/actions/auth";
import {connect} from "react-redux";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {getServer} from "../../../utils/getServerName";
const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(styles1);

const Register = (props) => {

    const [userProps,setUserProps]= React.useState({});
    const [generalResponse,setGeneralResponse]= React.useState("");
    const [isError,setErrorFlag]= React.useState(false);
    const classes = useStyles();
    const classes1 = useStyles1();

    const submit = (e) => {
        console.log(userProps);
        axios.post(`${getServer()}/register`,userProps)
            .then(response => {
                if (response.status === 200) {
                    setGeneralResponse(response.data)
                    setErrorFlag(false)
                }
            })
            .catch(error => {
                if(error.status === 500) {
                    setGeneralResponse(error.response.data)
                    setErrorFlag(true)
                }
                else{
                    console.log(error.response.data.errors)
                }
            });
        e.preventDefault()
    }


    return(
    <form className={classes.form} onSubmit={(event) => submit(event)}>

        <h4 align="center">Sign Up</h4>
        <h6 align="center" style={{color:isError?"red":"green"}}>{generalResponse}</h6>
        <CardBody>
            <GridContainer justifyContent="center">
                <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="First Name"
                id="fname"
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    type: "text",
                    onChange: (event)=>{setUserProps({...userProps,firstName:event.target.value})},
                    autoComplete: "on",
                    value: userProps.firstName,
                    required:true,
                }}
                white={false}

            />
                </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Last Name"
                    id="sname"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    inputProps={{
                        type: "text",
                        onChange: (event)=>{setUserProps({...userProps,lastName:event.target.value})},
                        autoComplete: "on",
                        value: userProps.lastName,
                        required:true
                    }}
                    white={false}
                />
            </GridItem>
            </GridContainer>
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
                    onChange: (event)=>{setUserProps({...userProps,email:event.target.value})},
                    autoComplete: "on",
                    value: userProps.email,
                    required:true
                }}
                white={false}
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
                    required:true,
                    onChange: (event)=>{setUserProps({...userProps,password:event.target.value})},
                }}
            />

            <button type="submit" hidden>Submit</button>
        </CardBody>
    </form>
    )

}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user)),
    setAuthState : authFlag => dispatch(setAuthState(authFlag))
})

export default connect(mapStateToProps,mapDispatchToProps)(Register);