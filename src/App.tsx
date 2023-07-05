import React, {useContext, useEffect} from 'react';
import {AuthContextProvider, AuthContextUser} from "./auth/AuthContext";
import {HeaderMenuLink} from "./Layout/HeaderMenuLink";
import "bootstrap/dist/css/bootstrap.min.css";
import {HeaderRouter} from "./Layout/HeaderRouter";
import {Footer} from "./Layout/Footer";
import './App.css';

function App() {

  return (
      <div className="App-div">
          <AuthContextProvider>
              <HeaderMenuLink/>
                <HeaderRouter/>
          </AuthContextProvider>
          <Footer/>
    </div>
  )
}

export default App;
