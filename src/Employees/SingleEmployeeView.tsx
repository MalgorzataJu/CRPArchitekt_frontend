import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import { Button, Card, Table} from "react-bootstrap";
import { EmployeeResAllInfo } from 'types';
import {apiUrl} from "../config/api";

export const SingleEmployeeView = () => {
    const [employee, setEmployee] = useState<EmployeeResAllInfo | null>(null);
    const {idOfEmployee} = useParams();

    useEffect(() => {
        (async () => {

            const res =await fetch(`${apiUrl}/employee/${idOfEmployee}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setEmployee(data);
            console.log(data)
        })();
    }, []);

    if (employee === null) {
        return null;
    }

    return <>
        <div
            className="d-flex justify-content-center"
        >
            <Card>
                <Card.Header><h2>Pracownik: {employee.firstName} {employee.lastName}</h2></Card.Header>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <th>Imię</th>
                        <td>{employee.firstName}</td>
                    </tr>
                    <tr>
                        <th>Nazwisko</th>
                        <td>{employee.lastName}</td>
                    </tr>
                    <tr>
                        <th>email</th>
                        <td>{employee.email}</td>
                    </tr>
                    <tr>
                        <th>Stawka</th>
                        <td>{employee.hourly}</td>
                    </tr>
                    </tbody>
                </Table>
                <Link to={`/employee/edit/${employee.id}`}>
                    <Button variant="secondary" type="submit" >
                        Edytuj dane pracownika
                    </Button>
                </Link>
                <h4>Widok miesiąca pracy</h4>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
            </Card>
        </div>
    </>;
};
