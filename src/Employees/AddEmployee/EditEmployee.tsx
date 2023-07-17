import React, {FormEvent, useEffect, useState} from 'react';
import {EmployeeResAllInfo} from 'types';
import {Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {EmployeesView} from "../../views/EmployeesView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";

export const EditEmployee = () => {
    const {idOfEmployee} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });
    const [form, setForm] = useState<EmployeeResAllInfo>({
        firstName: '',
        lastName: '',
        email: '',
        hourly: 0,
    });

    useEffect(() => {
        (async () => {
            const apiResponse = await fetch(`${apiUrl}/employee/${idOfEmployee}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const employee = await apiResponse.json();
            setForm({
                firstName: employee.firstName,
                lastName:employee.lastName,
                email: employee.email,
                hourly:employee.hourly,
            });
        })();
    }, []);

    const updateForm = (key: string, value: any) => {

        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/employee/${idOfEmployee}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(form),
            })
            // const data = await res.json();

            // setResultInfo({status: true, message: `${data.name} has been changed.`});
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo.status) {
        return  <EmployeesView/>
    }

    return <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{  minWidth: "500px", }}
            ><Card>
            <Card.Header><h2>Edytuj dane pracownika:</h2></Card.Header>
            <Card.Body>
                <div>{resultInfo.message}</div>
            <form onSubmit={sendForm} className="AddEmployee">
            <div className='LabelForm'>
                <label>
                    Nazwisko:
                    <input
                        className="InputForm"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={e => updateForm('lastName', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Imie:
                    <textarea
                        className="InputForm"
                        name="firstName"
                        value={form.firstName}
                        onChange={e => updateForm('firstName', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    email:
                    <input
                        className="InputForm"
                        type="text"
                        name = "email"
                        value={form.email}
                        onChange={e => updateForm('email', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Stawka:
                    <input
                        className="InputForm"
                        type="number"
                        name="hourly"
                        value={form.hourly}
                        onChange={e => updateForm('hourly', e.target.value)}
                    /><br/>
                </label>
            </div>

            <button className="ButtonForm" type="submit">Zapisz zmiany</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
