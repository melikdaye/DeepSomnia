import {UserActionTypes} from "../actions/types";

export const userReducer = (state = {currentUser: null},action) => {
    switch (action.type){
        case  UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}
