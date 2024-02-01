import {useEffect, useState} from "react";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import {HoursItemRes, ListHourCountRes, ListHourResAll} from "types";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";
import {Pagination} from "../component/common/Pagination/Pagination";
import {Calendar} from "../component/common/Calendar/Calendar";
import {Form} from "react-bootstrap";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);
    const [countHoursForDay, setCountHoursForDay] = useState<ListHourCountRes[]>([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [totalItems, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });
    const month = ["styczeń", "luty", "marzec", "kwiecień", "maj","czerwca",
        "lipiec", "sierpień", "wrzesień", "październik", "listopad","grudzień"];

    const params = new URLSearchParams({
        m:(+date.month + 1).toString(),
        y:date.year.toString()
    });

    const searchProps ="?" + params.toString();

    const updateForm = (key: string, value: any) => {

        setDate(form => ({
            ...form,
            [key]:  (key === 'quantity')?Number(value): value,
        }));
    };
    const handlePageChange = (pageNumber:number) => {
        setCurrentPage(pageNumber);
    };

    const countHoursPerDay = async() => {
        try {
            setCountHoursForDay([]);

            const apiResponse = await fetch(`${apiUrl}/hour/sum/${searchProps}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await apiResponse.json();
            setCountHoursForDay(result);

        } finally {
        }
    };

    const refreshHoursList = async () => {
    try {
        setHoursList(null);
        setPagesCount(1);
        const apiResponse = await fetch(`${apiUrl}/hour/all/${currentPage}/${searchProps}`, {
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
        countHoursPerDay();
    }, [currentPage,date]);


if (hoursList === null) {
        return <Spinner/>;
    }

    return  <>
        <div>
            <div className="d-flex w-50">
                Miesiąc:
                    <Form.Select
                        size="sm"
                        aria-label="Default select example"
                        onChange={e => updateForm('month', e.target.value)}
                    >
                        {
                            month.map((el, index) => {
                                if (index == date.month)
                                    return <option selected value={index}>{el}</option>
                                return <option value={index}>{el}</option>})
                        }
                    </Form.Select>
                ROK:
                    <Form.Select
                        size="sm"
                        aria-label="Default select example"
                        onChange={e => updateForm('year', e.target.value)}
                    >
                        {
                            <option>2024</option>
                            // month.map((el, index) => {return <option value={index}>{el}</option>})
                        }

                    </Form.Select>
            </div>
            <Calendar date={date} countHoursForDay={countHoursForDay}/>
            <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
            <Pagination countPages={pagesCount} totalCount = {totalItems} activeNumber={currentPage} handlePageChange={handlePageChange} />
        </div>
    </>

}

