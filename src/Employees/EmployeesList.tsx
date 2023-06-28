import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {EmployeeTable} from "./EmployeeTable";
import {Login} from "../views/Login";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";


export const EmployeesList = () => {

    const [list, setList] = useState<ListEmployeeResAll[] | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshEmployee = async () => {

        try {
                setList(null)

            const apiResponse = await fetch(`${apiUrl}/employee`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await apiResponse.json();
            setList(result);
            setIsLogin(true);
        } finally {

        }
    };

    useEffect(() => {
        refreshEmployee();
    }, []);

    if (!isLogin) return <Login/>

    if (list === null) {
        return <Spinner/>;
    }

    return (
        <div>
            <EmployeeTable list={list} onEmployeeChange={refreshEmployee}/>
        </div>
    )
}
