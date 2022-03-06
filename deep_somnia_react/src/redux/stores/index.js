import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from 'redux/reducer';
import {logger} from "redux-logger";
import {persistStore} from "redux-persist";

const middlewares = [logger];
const store = createStore(reducers,{},applyMiddleware(...middlewares));
export const persistor = persistStore(store);
export const ReduxStore = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}


export default { persistor, ReduxStore };