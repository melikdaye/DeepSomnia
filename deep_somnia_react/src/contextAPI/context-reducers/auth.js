
const initialState = {};

export const initialAuth = (initialValue = initialState) =>
   localStorage.getItem("token") || initialValue;


export const authReducer = (state = initialState,action) => {
    return action.payload;
}