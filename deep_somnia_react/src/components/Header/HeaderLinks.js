/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import {Link} from "react-router-dom";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import {SupervisorAccount, ExitToAppOutlined} from "@material-ui/icons";
// core components
import Button from "../../components/CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import setAuthToken from "../../utils/setAuthToken";
import {setCurrentUser} from "../../redux/actions/user";
import {setAuthState} from "../../redux/actions/auth";
import {connect} from "react-redux";


const useStyles = makeStyles(styles);

const HeaderLinks = (props) =>{
    const classes = useStyles();
    let text = props.link === "/login" ? "Sign In/Up" : "Log Out";
    const logout = () => {
      if(props.link === "/logout"){
          localStorage.removeItem("token")
          setAuthToken(null);
          props.setAuthState(false);
          props.setCurrentUser(null);
      }
    }
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Link  onClick={logout} style = {{color : "white"}} to={props.link === "/logout" ? "/" : props.link}>
                    <Button
                        color="transparent"
                        target="_blank"

                    >
                        {props.link === "/login" ? < SupervisorAccount className={classes.icons}/>: <ExitToAppOutlined className={classes.icons}/>}
                        {text}

                    </Button>
                </Link>
            </ListItem>
        </List>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user)),
    setAuthState : authFlag => dispatch(setAuthState(authFlag))
})

export default connect(null,mapDispatchToProps)(HeaderLinks);