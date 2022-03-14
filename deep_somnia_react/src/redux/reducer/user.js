import {UserActionTypes} from "../actions/types";

export const userReducer = (state = {currentUser: null},action) => {
    switch (action.type){
        case  UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case UserActionTypes.SET_USER_CREDITS:
            return {
                ...state,
                currentUser: {...state.currentUser,credits : action.payload}
            }
        default:
            return state;
    }
}


