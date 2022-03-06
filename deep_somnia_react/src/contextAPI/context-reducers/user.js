

const initialState = {};

export const initializer = (initialValue = initialState) =>
    JSON.parse(localStorage.getItem("userInfo")) || initialValue;


export const userReducer = (state = initialState,action) => {
    switch (action.type){
        case "updateUser":
            return action.payload;
        default:
            return state
    }
}
