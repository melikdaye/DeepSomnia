import './App.css';
import LoginView from "./views/LoginPage/LoginPage";
import LandingPage from "./views/LandingPage/LandingPage";
import {
    BrowserRouter as Router,
    Route, Switch,
} from "react-router-dom";
import ProfilePage from "./views/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import setAuthToken from "./utils/setAuthToken";
import {ReduxStore,persistor} from "./redux/stores";
import { PersistGate} from "redux-persist/integration/react";
import NftPage from "./views/NftPage";
import React from "react";
import ResetPass from "./views/ResetPass";
import image from "assets/img/bg-login.png";
import Background from "./components/Background/Background";
require("dotenv").config()
if (localStorage.token) {
    setAuthToken(localStorage.token);
}


function App() {

  return (

        <Router>
            <ReduxStore>
                <PersistGate persistor = {persistor}>
                    <Switch>
            <ProtectedRoute exact path="/" alternatePath="/profile"  dest={(props)=><LandingPage {...props}/>} component={(props)=><ProfilePage {...props}/>}/>
            <Route exact path="/login" component={LoginView}/>
            <ProtectedRoute exact path="/profile" component={(props) => <ProfilePage {...props}/>} dest={(props) => <LoginView {...props}/>}/>
            <ProtectedRoute exact path="/profile/myNFTs/:id" component={(props) => <NftPage {...props}/>} dest={(props) => <LoginView {...props}/>}/>
            <Route path="/resetPassWord" render={(props)=> Background(ResetPass)({...props,image})}/>

                    </Switch>
                </PersistGate>
            </ReduxStore>
        </Router>


  );
}

export default App;
