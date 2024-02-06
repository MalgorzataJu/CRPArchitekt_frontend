import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {EmployeeTable} from "./EmployeeTable";
import {Login} from "../views/Login";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {toast} from "react-toastify";


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

            if (!apiResponse.ok) {
                throw new Error('Problem z pobieraniem danych');
            }

            const result = await apiResponse.json();
            setList(result);
            setIsLogin(true);
        } catch (error) {
            toast.error(`Błąd:`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
