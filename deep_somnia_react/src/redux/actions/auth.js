import {AuthActionTypes} from "./types";

export const setAuthState = authFlag =>({
    type: AuthActionTypes.SET_AUTH_FLAG,
    payload : authFlag
})