import React, {useContext, useEffect} from 'react';
import {AuthContextProvider, AuthContextUser} from "./auth/AuthContext";
import {HeaderMenuLink} from "./Layout/HeaderMenuLink";
import {HeaderRouter} from "./Layout/HeaderRouter";
import {Footer} from "./Layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import './App.css';

function App() {
    console.log("API URL:", process.env.REACT_APP_API_URL)
  return (
      <div className="App-div">
          <AuthContextProvider>
              <HeaderMenuLink/>
                <HeaderRouter/>
          </AuthContextProvider>
          {/*<Footer/>*/}
          <ToastContainer />
    </div>
  )
}

export default App;
