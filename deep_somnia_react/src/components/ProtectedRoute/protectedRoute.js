import React, {useContext, useEffect} from "react";
import {UserContext} from "../../contextAPI/contexts/user";
import { Route,Redirect } from "react-router-dom";
import axios from "axios";
import {setAuthState} from "../../redux/actions/auth";
import {connect} from "react-redux";
import {getServer} from "../../utils/getServerName";

const ProtectedRoute = ({ component: Component, dest:DestComponent, ...rest }) => {
    // const {userInfo,dispatch,auth,setAuth} = useContext(UserContext);
    useEffect(async () => {
            try {
                const res = await axios.get(`${getServer()}/auth`);
                // setAuth({payload:true})
                rest.setAuthState(true);
            } catch (err) {
                rest.setAuthState(false);
                // console.clear()
                // setAuth({payload:false})
            }
    },[]);

    console.log(rest)
    // window.location.pathname = rest.auth?rest.alternatePath:rest.path
    return(
    <Route

        exact path={rest.auth?rest.alternatePath:rest.path}
        {...rest}
        render={(props) =>(
            rest.auth ? (

                <Component {...props} />
            ) : (
                // <Redirect to="/login" />
                <DestComponent {...props}/>
            )
        )}
    />
    )
};

const mapStateToProps = state => ({
    auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
    setAuthState : authFlag => dispatch(setAuthState(authFlag))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProtectedRoute);