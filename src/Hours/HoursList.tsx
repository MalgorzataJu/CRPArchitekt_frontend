import {useEffect, useState} from "react";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import {HoursItemRes, ListHourCountRes, ListHourResAll, SimpleRest} from "types";
import {apiUrl} from "../config/api";
import {Spinner} from "../component/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";
import {Pagination} from "../component/common/Pagination/Pagination";
import {Calendar} from "../component/common/Calendar/Calendar";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Statistic} from "../component/common/Statistic/Statistic";
import {toast} from "react-toastify";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);
    const [hoursForProject, setHoursForProject] = useState<SimpleRest[] >([]);
    const [hoursForKindeOfWork, setHoursForKindeOfWork] = useState<SimpleRest[] >([]);
    const [totalMonthlyHours, setTotalMonthlyHours] = useState<number>(0);
    const [totalMonthlyHoursForEmployee, setTttalMonthlyHoursForEmployee] = useState<SimpleRest[]>([]);
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

            if (!apiResponse.ok) {
                throw new Error('Problem z pobieraniem danych');
            }
            const result = await apiResponse.json();
            setCountHoursForDay(result.hoursCountPerDay);
            setHoursForKindeOfWork(result.hoursForKindeOfWork);
            setHoursForProject(result.hoursForProject);
            setTotalMonthlyHours(result.totalMonthlyHours);
            setTttalMonthlyHoursForEmployee(result.totalMonthlyHoursForEmployee);
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
    }

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

        if (!apiResponse.ok) {
            throw new Error('Problem z pobieraniem danych');
        }
        const result = await apiResponse.json();

        setHoursList(result.items);
        setPagesCount(result.pagesCount);
        setTotalItem(result.totalItems);

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
        refreshHoursList();
        countHoursPerDay();
    }, [currentPage,date]);


if (hoursList === null) {
        return <Spinner/>;
    }

    return   <Container>
                <Row>
                    <Col>
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
                            <Statistic
                                date={date}
                                hoursForProject = { hoursForProject}
                                hoursForKindeOfWork = {hoursForKindeOfWork}
                                totalMonthlyHours = {totalMonthlyHours }
                                totalMonthlyHoursForEmployee = {totalMonthlyHoursForEmployee}
                            />
                    </Col>
                    <Col>
                        <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
                        <Pagination countPages={pagesCount} totalCount = {totalItems} activeNumber={currentPage} handlePageChange={handlePageChange} />
                    </Col>
                </Row>

            </Container>
}

