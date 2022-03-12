import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import axios from "axios";
import {getServer} from "../../../utils/getServerName";
const useStyles = makeStyles(styles);

const Reset = (props) => {

    const [email,setEmail]= React.useState("");
    const [generalResponse,setGeneralResponse]= React.useState("");
    const [isError,setErrorFlag]= React.useState(false);
    const classes = useStyles();
    const submit = (e) => {
        console.log(email)
        axios.post(`${getServer()}/resetPassword/`,{email})
            .then(response => {
                if (response.status === 200) {
                    setGeneralResponse(response.data)
                    setErrorFlag(false)
                }
            })
            .catch(error => {
                setGeneralResponse(error.response.data)
                setErrorFlag(true)
            });
        e.preventDefault()
    }


    return(
        <form className={classes.form} onSubmit={(event) => submit(event)}>

            <h4 align="center">Please enter email for receiving reset connection</h4>
            <h6 align="center" style={{color:isError?"red":"green"}}>{generalResponse}</h6>
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
                        onChange: (event)=>{setEmail(event.target.value)},
                        autoComplete: "on",
                        value: email,
                    }}
                    white={false}
                />

                <button type="submit" hidden>Submit</button>
            </CardBody>
        </form>
    )

}




export default Reset;