import React, { SyntheticEvent, useEffect, useState} from 'react';
import {EmployeesView} from "../../views/EmployeesView";
import {Card} from "react-bootstrap";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";
import '../../Layout/style.css';
import {UserRole} from "types";

export const AddEmployee = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | undefined>(false);
    const [resultInfo, setResultInfo] = useState({
        isOk: false,
        message: '',
    });

    const [errorLabel, setErrorLabel] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        hourly: '',
    })
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pwd: '',
        confirm: '',
        hourly: 0,
        role: UserRole.Employee,
    });

    const sendForm = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const apiResponse = await fetch(`${apiUrl}/employee/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            const result = await apiResponse.json();
            setResultInfo( {
                message: result,
                isOk: true,
              });
            console.log(result)
            console.log( form)

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setIsValid(validationAll());
    }, [form, isValid]);

    const changeForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const validation = (key: string): boolean => {

        let text = 'true';
        if (key === 'name' && form.firstName.length < 3)
            text = 'Imie jest za krótkie.';
        if (key === 'lastname' && form.lastName.length < 3)
            text = 'Nazwisko jest za krótkie.';
        if ((key === 'email') && (form.email.length < 3 || !form.email.includes('@')))
            text = 'Email powinien zawierać @ oraz min 3 znaki.';
        if (key === 'password' && form.pwd.length < 8)
            text = 'Hasło powinno mieć min 8 znaków.';
        if (key === 'confirm' && form.pwd !== form.confirm)
            text = 'Hasła nie są identyczne.';

        setErrorLabel(label => ({
            ...label,
            [key]: text,
        }));

        return text === '';
    }
    const validationAll = (): boolean | undefined => {
        for (const key in errorLabel)
            if (Object(errorLabel)[key] !== 'true')
                return false;
        return true;
    }

    const changeColor = (label: string): string => {
        let color = '';
        if (Object(errorLabel)[label] === 'true')
            color = 'green';
        else if (Object(errorLabel)[label] !== '')
            color = 'red';
        return color;
    }

    const printError = () => (Object.values(errorLabel).map(el => (el !== '' ? el !== 'false' ? el !== 'true' ? `${el}` : '' : '' : '')));

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo.message != '') {
        return  <EmployeesView/>
    }
    return<>
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "600px", }}
        ><Card>
            <Card.Header><h2>Rejestracja Pracownika</h2></Card.Header>
            <Card.Body>
        <div
            style={{height: '30px', color: 'red'}}
        >{printError()}</div>
        <form onSubmit={sendForm}>
            {/*<div >{resultInfo.message}</div>*/}
            <div className='LabelForm'>
            <label>
                Imię:
                <input
                    className="InputForm"
                    type="text"
                    name='firstName'
                    onChange={e => changeForm("firstName", e.target.value)}
                    onKeyUp={e => validation("firstName")}
                    style={{
                        borderColor: `${changeColor("firstName")}`
                    }}
                />
            </label>
            </div>
            <div className='LabelForm'>
            <label>
                Nazwisko:
                <input
                    className="InputForm"
                    type="text"
                    name='lastName'
                    onChange={e => changeForm("lastName", e.target.value)}
                    onKeyUp={e => validation("lastName")}
                    style={{
                        borderColor: `${changeColor("lastName")}`
                    }}
                />
            </label>
            </div>
            <div className='LabelForm'>
            <label>
                email:
                <input
                    className="InputForm"
                    type="text"
                    name='email'
                    onChange={e => changeForm("email", e.target.value)}
                    onKeyUp={e => validation("email")}
                    style={{
                        borderColor: `${changeColor("email")}`
                    }}
                />
            </label>
            </div>
            <div className='LabelForm'>
            <label>
                Hasło:
                <input
                    className="InputForm"
                    type="password"
                    name='pwd'
                    onChange={e => changeForm("pwd", e.target.value)}
                    onKeyUp={e => validation("pwd")}
                    style={{
                        borderColor: `${changeColor("pwd")}`
                    }}
                />
            </label>
            </div>
            <div className='LabelForm'>
            <label>
                Hasło powtórzone:
                <input
                    className="InputForm"
                    type="password"
                    name='confirm'
                    onChange={e => changeForm("confirm", e.target.value)}
                    onKeyUp={e => validation("confirm")}
                    style={{
                        borderColor: `${changeColor("confirm")}`
                    }}
                />
            </label>
            </div>
            <div className='LabelForm'>
            <label>
                Stawka godzinowa:
                <input
                    className="InputForm"
                    type="number"
                    name='hourly'
                    onChange={e => changeForm("hourly", e.target.value)}
                    onKeyUp={e => validation("hourly")}

                />
            </label>
            </div>
            <div className='LabelForm'>
                    rola w systemie:
                    <select
                        className="InputForm"
                        value={form.role}
                        name='role'
                        onChange={e => changeForm("role", e.target.value)}
                        // onKeyUp={e => validation("role")}
                    >
                        <option key={1} value={UserRole.Employee}>
                            {UserRole.Employee}
                        </option>
                        <option key={2} value={UserRole.Boss}>
                            {UserRole.Boss}
                        </option>
            </select>
        </div>
            <div className='LabelForm'>
            <button
                className="ButtonForm unactive"
                style={{
                    borderColor: `${!isValid ? 'red' : 'green'}`
                }}
                // disabled={!isValid}
                type={'submit'}>ZAREJESTRUJ
            </button>
            </div>
        </form>
            </Card.Body>
    </Card>
    </div>
    </>
}
