import './App.css';
import LoginView from "./views/LoginPage/LoginPage";
import LandingPage from "./views/LandingPage/LandingPage";
import {
    BrowserRouter as Router,
    Route, Switch,
} from "react-router-dom";
import ProfilePage from "./views/ProfilePage";
import UserContextProvider from "./contextAPI/contexts/user";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import setAuthToken from "./utils/setAuthToken";
import {ReduxStore,persistor} from "./redux/stores";
import { PersistGate} from "redux-persist/integration/react";
import NftPage from "./views/NftPage";
import React from "react";
require("dotenv").config()
if (localStorage.token) {
    setAuthToken(localStorage.token);
}


function App() {
  return (

        <Router>
            {/*<UserContextProvider>*/}

            <ReduxStore>
                <PersistGate persistor = {persistor}>
                    <Switch>
            <ProtectedRoute exact path="/" alternatePath="/profile"  dest={(props)=><LandingPage {...props}/>} component={(props)=><ProfilePage {...props}/>}/>
            <Route exact path="/login" component={LoginView}/>
            <ProtectedRoute exact path="/profile" component={(props) => <ProfilePage {...props}/>} dest={(props) => <LoginView {...props}/>}/>
            <ProtectedRoute exact path="/profile/myNFTs/:id" component={(props) => <NftPage {...props}/>} dest={(props) => <LoginView {...props}/>}/>
                    </Switch>
                </PersistGate>
            </ReduxStore>
            {/*</UserContextProvider>*/}

        </Router>


  );
}

export default App;
