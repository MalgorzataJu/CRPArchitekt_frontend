import {ReactNode, useContext} from "react";
import {AuthContextUser} from "./AuthContext";
import {NotFoundView} from "../views/NotFoundView";

interface Props {
  children: ReactNode,
  accessBy: string,
}

export const ProtectedRoute = ({ children, accessBy } : Props ) => {
  const {user} = useContext(AuthContextUser);

  return ((user?.role === "Admin") || (user?.role === accessBy))
    ?<>{children}</>
    : <NotFoundView/>
}
