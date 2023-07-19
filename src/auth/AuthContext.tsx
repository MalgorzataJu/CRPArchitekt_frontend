import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogInPair, UserRole} from "types";
import {apiUrl} from "../config/api";

interface UserData {
  role: UserRole;
  id:string;
  email: string ;
}
export interface AuthContextValues {
  user:UserData | null;
  isAuthenticated: boolean;
  login: (authInfo : LogInPair) => void;
  logout: () => void;
}
export const AuthContextUser = createContext<AuthContextValues>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const Provider = AuthContextUser.Provider;

interface Props {
  children: ReactNode,
}

export const AuthContextProvider = ({ children }:Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(() => {

    const userProfle = localStorage.getItem("jwt");

    if (userProfle) {
      setIsAuthenticated(true)
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload: LogInPair) => {
    try {

      const apiResponse = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const result = await apiResponse.json();

    if (result === false ) {
      setUser(null);
      setIsAuthenticated(false);
    } else {
      localStorage.setItem("jwt", JSON.stringify(result));
      setUser(result);
      setIsAuthenticated(true);
      navigate("/");
    }
    } finally {
    }

  };

  const logout = async () => {

    localStorage.removeItem("jwt");

    await fetch(`${apiUrl}/auth/logout`, {
          credentials: "include",
        });
    setUser(null);
    setIsAuthenticated(false)
    navigate("/Login");
  };


  return (
     <Provider
         value={{
           user,
           isAuthenticated,
           login,
           logout,
          }}
     >
        {children}
      </Provider>
  );
};
export default AuthContextProvider;
