import {useEffect, useState} from "react";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import { ListHourResAll } from "types";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";
import {Pagination} from "../component/common/Pagination/Pagination";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [totalItems, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber:number) => {
        setCurrentPage(pageNumber);
    };

    const refreshHoursList = async () => {
    try {
        setHoursList(null);
        setPagesCount(1);
        const apiResponse = await fetch(`${apiUrl}/hour/all/${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await apiResponse.json();
        console.log(result.items)
        setHoursList(result.items);
        setPagesCount(result.pagesCount);
        setTotalItem(result.totalItems);

        } finally {
        }
    };

    useEffect(() => {
        refreshHoursList();
    }, [currentPage]);


if (hoursList === null) {
        return <Spinner/>;
    }

    return  <>
        <div>
            <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
            <Pagination countPages={pagesCount} totalCount = {totalItems} activeNumber={currentPage} handlePageChange={handlePageChange} />
        </div>
    </>

}

