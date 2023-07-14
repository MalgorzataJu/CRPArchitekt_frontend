import {useEffect, useState} from "react";
import { ListProjectSimpleResAll } from "types";
import {ProjectTable} from "./ProjectTable";
import {Login} from "../views/Login";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {toast} from "react-toastify";


export const ProjectsList = () => {
    const [projects, setProjects] = useState<ListProjectSimpleResAll | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshProject = async () => {

        try {

            setProjects(null);
            const apiResponse = await fetch(`${apiUrl}/project`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await apiResponse.json();
            setProjects(result);
            setIsLogin(true);
            console.log(result)
        }finally {

        }}

    useEffect(() => {
        refreshProject();
    }, []);

    if (!isLogin) return <Login/>

    if (projects === null) {
        return <Spinner/>;
    }
    return <ProjectTable projects={projects} onProjectsChange={refreshProject}/>
}
