import {UserActionTypes} from "./types";

export const setCurrentUser = user =>({
    type: UserActionTypes.SET_CURRENT_USER,
    payload : user
})

export const setCredits = (credit) => ({
    type : UserActionTypes.SET_USER_CREDITS,
    payload : credit
})