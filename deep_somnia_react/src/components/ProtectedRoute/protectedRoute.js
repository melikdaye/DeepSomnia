import React, {useEffect} from "react";
import { Route} from "react-router-dom";
import axios from "axios";
import {setAuthState} from "../../redux/actions/auth";
import {connect} from "react-redux";
import {getServer} from "../../utils/getServerName";

const ProtectedRoute = ({ component: Component, dest:DestComponent, ...rest }) => {
    // const {userInfo,dispatch,auth,setAuth} = useContext(UserContext);
    useEffect( () => {
        async function checkAuth() {
            try {
                const res = await axios.get(`${getServer()}/auth`);
                if (res.status === 200)
                    rest.setAuthState(true);
            } catch (err) {
                rest.setAuthState(false);
            }
        }
        checkAuth().then();
    },[rest]);

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