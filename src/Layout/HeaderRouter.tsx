import {Route, Routes} from "react-router-dom";
import {HomeView} from "../views/HomeView";
import {Login} from "../views/Login";
import React, {ReactNode, useContext, useEffect} from "react";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {EmployeesView} from "../views/EmployeesView";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {EditEmployee} from "../Employees/AddEmployee/EditEmployee";
import {SingleEmployeeView} from "../Employees/SingleEmployeeView";
import {ProjectsView} from "../views/ProjectsView";
import {NotFoundView} from "../views/NotFoundView";
import {AddHours} from "../Hours/AddHours/AddHours";
import {HoursView} from "../views/HoursView";
import {AddProject} from "../Projects/AddAndEditProject/AddProject";
import {EditProject} from "../Projects/AddAndEditProject/EditProject";
import {SingleProjectView} from "../Projects/SingleProjectView";
import {AuthContextUser} from "../auth/AuthContext";
import {KindOfWorkView} from "../views/KindOfWorkView";

export const HeaderRouter=() => {
    const {isAuthenticated} = useContext(AuthContextUser);

   return <div className='Content'>
              <Routes>
                <Route
                    path="/"
                    element={<HomeView/>}
                ></Route>
                <Route
                    path="/login"
                    element={<Login/>}
                ></Route>

         {isAuthenticated &&(
             <>
                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute accessBy="Boss">
                            <EmployeesView/>
                        </ProtectedRoute>
                    }
                ></Route>
                <Route path="/add-employee"
                       element={
                           <ProtectedRoute accessBy="Boss">
                               <AddEmployee/>
                           </ProtectedRoute>
                       }
                ></Route>
                <Route path="/employee/edit/:idOfEmployee"
                       element={
                           <ProtectedRoute accessBy="Boss">
                               <EditEmployee/>
                           </ProtectedRoute>
                       }
                ></Route>
                <Route path="/employee/:idOfEmployee"
                       element={
                           <ProtectedRoute accessBy="Boss">
                               <SingleEmployeeView/>
                           </ProtectedRoute>
                       }
                ></Route>

                <Route path="/projects"
                       element={
                               <ProjectsView/>
                       }
                ></Route>
                <Route path="/project/:idOfProject"
                       element={
                               <SingleProjectView/>
                       }
                ></Route>
                <Route path="/project/edit/:idOfProject"
                       element={
                               <EditProject/>
                       }
                ></Route>

                <Route path="/add-project"
                       element={
                               <AddProject/>
                       }
                ></Route>
                <Route path="/hours"
                       element={
                           <HoursView/>
                       }
                ></Route>
                <Route path="/add-hour"
                       element={
                               <AddHours/>
                       }
                ></Route>
                 <Route path="/kindofwork"
                        element={
                            <KindOfWorkView/>
                        }
                 ></Route>
             </>
             )}
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>

        </div>
}
