import {useEffect, useState} from "react";
import {ListKindOfWorkRes, ListProjectSimpleResAll} from "types";
import {Login} from "../views/Login";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {KindOfWorkTable} from "./KindOfWorkTable";


export const KindOfWorkList = () => {
    const [kindOfWork, setKindOfWork] = useState<ListKindOfWorkRes[] | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshKOW = async () => {
        try {
            setKindOfWork(null);
            const apiResponse = await fetch(`${apiUrl}/kindofwork`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await apiResponse.json();
            setKindOfWork(result);
            setIsLogin(true);
        }finally {

        }}

    useEffect(() => {
        refreshKOW();
    }, []);

    if (!isLogin) return <Login/>

    if (kindOfWork === null) {
        return <Spinner/>;
    }
    return <KindOfWorkTable kow={kindOfWork} onKindOfWorkChange={refreshKOW}/>
}
