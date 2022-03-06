import {AuthActionTypes} from "../actions/types";

export const authReducer = (state = {auth:null},action) => {
    switch (action.type){
        case AuthActionTypes.SET_AUTH_FLAG:
            return {
                ...state,
                auth: action.payload
        }
        default:
            return state;
    }

}