import {createContext, useEffect, useReducer, useState} from 'react';
import {userReducer,initializer} from "../context-reducers/user";
import {authReducer,initialAuth} from "../context-reducers/auth";


export const UserContext = createContext({});

const UserContextProvider = (props) => {

    const [userInfo,dispatch] = useReducer(userReducer,{},initializer);
    const [auth,setAuth] = useReducer(authReducer,false,initialAuth);
    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }, [userInfo]);

    return (
        <UserContext.Provider value={{userInfo, dispatch, auth,setAuth}}>
            {props.children}
        </UserContext.Provider>
    )


}
export default UserContextProvider