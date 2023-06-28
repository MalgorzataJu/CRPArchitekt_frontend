import {JSX, ReactElement, ReactNode, useContext} from "react";
import {AuthContextUser} from "./AuthContext";
import {NotFoundView} from "../views/NotFoundView";

interface Props {
  children: ReactElement<any, any>,
  accessBy: string,
}

export const ProtectedRoute = ({ children, accessBy } : Props ): {children: JSX.Element} | JSX.Element=> {
  const {user} = useContext(AuthContextUser);

  if (user?.role === "Admin")
    return {children}
  else {
    return (user?.role === accessBy)
        ? {children}
        : <><NotFoundView/></> as React.ReactElement<any>
  }
}
