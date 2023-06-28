import {AuthContextProvider} from "../auth/AuthContext";
import {HeaderMenuLink} from "./HeaderMenuLink";
import {Route, Routes} from "react-router-dom";
import {HomeView} from "../views/HomeView";
import {Login} from "../views/Login";
import React, {ReactNode} from "react";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {EmployeesView} from "../views/EmployeesView";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {EditEmployee} from "../Employees/AddEmployee/EditEmployee";
import {SingleEmployeeView} from "../Employees/SingleEmployeeView";
import {ProjectsView} from "../views/ProjectsView";

export const HeaderRouter=() => (
    <div>
        <Routes>
            <Route
                path="/"
                element={<HomeView />}
            ></Route>
            <Route
                path="/login"
                element={<Login/>}
            ></Route>
            <Route
                path="/employee"
                element={
                        //<ProtectedRoute accessBy="Admin">
                            <EmployeesView />
                        //</ProtectedRoute>
                }
            ></Route>
            <Route path="/add-employee"
                   element={
                       //<ProtectedRoute accessBy="authenticated">
                           <AddEmployee />
                      // </ProtectedRoute>
                   }
            ></Route>
            <Route path="/employee/edit/:idOfEmployee"
                   element={
                      // <ProtectedRoute accessBy="authenticated">
                           <EditEmployee />
                      // </ProtectedRoute>
                   }
            ></Route>
            <Route path="/employee/:idOfEmployee"
                   element={
                      // <ProtectedRoute accessBy="authenticated">
                           <SingleEmployeeView />
                       //</ProtectedRoute>
                   }
            ></Route>

            <Route path="/projects"
                   element={
                //<ProtectedRoute accessBy="authenticated">
                <ProjectsView/>
                //</ProtectedRoute>
                    }
            ></Route>
        {/*    <Route path="/project/:idOfProject"*/}
        {/*           element={*/}
        {/*        <ProtectedRoute accessBy="authenticated">*/}
        {/*        <SingleProjectView/>*/}
        {/*        </ProtectedRoute>*/}
        {/*            }*/}
        {/*    ></Route>*/}
        {/*    <Route path="/project/edit/:idOfProject"*/}
        {/*           element={*/}
        {/*        <ProtectedRoute accessBy="authenticated">*/}
        {/*        <EditProject/>*/}
        {/*        </ProtectedRoute>*/}
        {/*            }*/}
        {/*    ></Route>*/}

        {/*    <Route path="/add-project"*/}
        {/*           element={*/}
        {/*               <ProtectedRoute accessBy="authenticated">*/}
        {/*                   <AddProject />*/}
        {/*               </ProtectedRoute>*/}
        {/*           }*/}
        {/*    ></Route>*/}
        {/*    <Route path="/hours"*/}
        {/*           element={*/}
        {/*               <ProtectedRoute accessBy="authenticated">*/}
        {/*                   <HoursView />*/}
        {/*               </ProtectedRoute>*/}
        {/*           }*/}
        {/*    ></Route>*/}
        {/*    <Route path="/add-hour"*/}
        {/*           element={*/}
        {/*               <ProtectedRoute accessBy="authenticated">*/}
        {/*                   <AddHours/>*/}
        {/*               </ProtectedRoute>*/}
        {/*           }*/}
        {/*    ></Route>*/}
        {/*    <Route path="*" element={<NotFoundView/>} />*/}
        </Routes>
    </div>
    )
