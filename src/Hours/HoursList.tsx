import {useEffect, useState} from "react";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import { ListHourResAll } from "types";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";
import {Pagination} from "../component/common/Pagination/Pagination";
import {Calendar} from "../component/common/Calendar/Calendar";
import {Form} from "react-bootstrap";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [totalItems, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = useState({
        month: 6,
        year: 2023,
    });
    const month = ["stycznia", "lutego", "marca", "kwietnia", "maja",
        "czerwca", "lipca", "sierpnia", "września", "października", "listopada",
        "grudnia"];


    const updateForm = (key: string, value: any) => {

        setDate(form => ({
            ...form,
            [key]:  (key === 'quantity')?Number(value): value,
        }));
    };
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
            <div className="d-flex w-50"> Miesiąc:
                <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    onChange={e => updateForm('month', e.target.value)}
                >
                    {
                        month.map((el, index) => {return <option value={index}>{el}</option>})
                    }

                </Form.Select>
                ROK:
                <Form.Select
                    size="sm"
                    aria-label="Default select example"
                >
                    {
                        month.map((el, index) => {return <option value={index}>{el}</option>})
                    }

                </Form.Select>
            </div>
            <Calendar data={date}/>
            <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
            <Pagination countPages={pagesCount} totalCount = {totalItems} activeNumber={currentPage} handlePageChange={handlePageChange} />
        </div>
    </>

}

