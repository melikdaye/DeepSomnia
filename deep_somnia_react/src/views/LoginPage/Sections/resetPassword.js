import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import {LockOutlined, Person} from "@material-ui/icons";
import CardFooter from "../../../components/Card/CardFooter";
import Button from "../../../components/CustomButtons/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import styles1 from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import {setCurrentUser} from "../../../redux/actions/user";
import {setAuthState} from "../../../redux/actions/auth";
import {connect} from "react-redux";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(styles1);

const Reset = (props) => {

    const [userProps,setUserProps]= React.useState({});
    const classes = useStyles();
    const classes1 = useStyles1();
    const submit = (e) => {
        console.log(userProps);
        // axios.post(`http://localhost:5000/register`, )
        //     .then(response => {
        //         if (response.status === 200) {
        //
        //         }
        //     })
        //     .catch(error => {
        //     });
        e.preventDefault()
    }


    return(
        <form className={classes.form} onSubmit={(event) => submit(event)}>

            <h4 align="center">Please enter email for receiving reset connection</h4>

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
                        onChange: (event)=>{setUserProps({...userProps,email:event.target.value})},
                        autoComplete: "on",
                        value: userProps.email,
                    }}
                    white={false}
                />

                <button type="submit" hidden>Submit</button>
            </CardBody>
        </form>
    )

}




export default Reset;