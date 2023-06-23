import {ReactElement, useContext} from "react";
import {AuthContextUser} from "./AuthContext";
import {NotFoundView} from "../views/NotFoundView";

interface Props {
  children: ReactElement,
  accessBy: string,
}

export const ProtectedRoute = ({ children, accessBy } : Props ) => {
  const {user} = useContext(AuthContextUser);
  if (user?.role === "Admin")
    return {children}
  else {
    return (user?.role === accessBy)
        ? <>
          {children}
        </>
        : <h1>ojc nie masz dostpu</h1>
        // : <><NotFoundView/></>
  }
}
