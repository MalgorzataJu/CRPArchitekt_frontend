import React from 'react';
import Background from "./Layout/tlo.jpg";
import {AuthContextProvider} from "./auth/AuthContext";
import {HeaderMenuLink} from "./Layout/HeaderMenuLink";
import "bootstrap/dist/css/bootstrap.min.css";
import {HeaderRouter} from "./Layout/HeaderRouter";

function App() {
  return (
      <div className="App-div" style={{
          backgroundImage: `url(${Background})`,
          height:'95vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
      }}>
          <AuthContextProvider>
                <HeaderMenuLink/>
                <HeaderRouter/>
          </AuthContextProvider>
    </div>
  )
}

export default App;
