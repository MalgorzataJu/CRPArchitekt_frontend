import {useEffect, useState} from "react";

import {toast} from "react-toastify";
import {apiUrl} from "../../config/api";
import {Login} from "../../views/Login";
import {Spinner} from "../../component/common/spiner/spinner";
import { ArchiveProjectTable } from "./ArchiveProjectTable";
import { ListProjectSimpleResArchive } from "types";;


export const ArchiveProjectsList = () => {
    const [projects, setProjects] = useState<ListProjectSimpleResArchive | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshProject = async () => {

        try {
            setProjects(null);
            const apiResponse = await fetch(`${apiUrl}/project/archive`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!apiResponse.ok) {
                throw new Error('Problem z pobieraniem projektów');
            }

            const result = await apiResponse.json();
            setProjects(result);
            setIsLogin(true);

        }catch (error) {
            toast.error(`${error}`);
        }
        finally {

        }}

    useEffect(() => {
        refreshProject();
    }, []);

    if (!isLogin) return <Login/>

    if (projects === null) {
        return <Spinner/>;
    }
    return <ArchiveProjectTable projects={projects} onProjectsChange={refreshProject}/>
}
