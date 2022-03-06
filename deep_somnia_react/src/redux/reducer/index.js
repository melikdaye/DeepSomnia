import {combineReducers} from "redux";
import {userReducer} from "./user";
import {authReducer} from "./auth";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {nftReducer} from "./myNfts";

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ["user","auth","NFTs"]
}

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    NFTs : nftReducer
    }
)


// export  default combineReducers({
//     user: userReducer,
//     auth: authReducer
// })

export default persistReducer(persistConfig,rootReducer);