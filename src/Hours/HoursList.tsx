import {useEffect, useState} from "react";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import { ListHourResAll } from "types";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);

    const refreshHoursList = async () => {

    try {
        setHoursList(null)
        const apiResponse = await fetch(`${apiUrl}/hour`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await apiResponse.json();
        setHoursList(result);
        } finally {
        }
    };

    useEffect(() => {
        refreshHoursList();
    }, []);


if (hoursList === null) {
        return <Spinner/>;
    }

    return  <>
        <div>
            <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
        </div>
    </>

}

