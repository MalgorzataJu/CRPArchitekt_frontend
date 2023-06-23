import {createContext, ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogInPair, UserRole} from "types";
import {apiUrl} from "../config/api";

interface UserData {
  role: UserRole;
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
  isAuthenticated: true,
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
    console.log("user", userProfle);
    console.log("isAuten",isAuthenticated)
    if (userProfle) {
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
      setIsAuthenticated(false)
    } else {
    localStorage.setItem("jwt", JSON.stringify(result));
      setUser(apiResponse);
      setIsAuthenticated(true)
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
