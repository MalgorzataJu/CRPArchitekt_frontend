import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogInPair, UserRole} from "types";
import {apiUrl} from "../config/api";
import {toast} from "react-toastify";

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

interface LoginErrorResponse {
  error: string;
  isAuthenticated: false;
}
interface Props {
  children: ReactNode,
}

const Provider = AuthContextUser.Provider;

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
    console.log("API URL being used:", apiUrl);

    try {
      const apiResponse = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!apiResponse.ok) {
        setUser(null);
        setIsAuthenticated(false);
        const errorResponse: LoginErrorResponse = await apiResponse.json();
        toast("Niepoprawne dane ${errorResponse.error}")
        throw new Error(errorResponse.error);
      }

      const result = await apiResponse.json();
      localStorage.setItem("jwt", JSON.stringify(result));
      setUser(result);
      setIsAuthenticated(true);
      navigate("/");

    } catch (error) {
        toast.error(`Błąd: Niepoprawne dane logowania`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };

  const logout = async () => {

    localStorage.removeItem("jwt");
    setUser(null);
    setIsAuthenticated(false)
    await fetch(`${apiUrl}/auth/logout`, {
          credentials: "include",
        });
    toast.info("Wylogowano")
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
