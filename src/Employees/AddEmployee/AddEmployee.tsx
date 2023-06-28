import React, { SyntheticEvent, useEffect, useState} from 'react';
import '../../Projects/AddAndEditProject/AddProject.css';
import {EmployeesView} from "../../views/EmployeesView";
import {Card} from "react-bootstrap";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";

export const AddEmployee = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | undefined>(false);
    const [resultInfo, setResultInfo] = useState({
        isOk: false,
        message: '',
    });

    const [errorLabel, setErrorLabel] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirm: '',
    })
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirm: '',
        hourly: 0,
    });

    const sendForm = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            // axios.post(`${apiUrl}/employee/register`, form,
            //     {withCredentials: true}
            // )
            //     .then((response) => {
            //
            //        response.data.id
            //            ?setResultInfo({isOk:true, message: response.data.email})
            //            :setResultInfo({isOk:false, message: 'Niestety nie można zarejestrować pracownika.'});
            //     });

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
        if (key === 'name' && form.name.length < 3)
            text = 'Imie jest za krótkie.';
        if (key === 'lastname' && form.lastname.length < 3)
            text = 'Nazwisko jest za krótkie.';
        if ((key === 'email') && (form.email.length < 3 || !form.email.includes('@')))
            text = 'Email powinien zawierać @ oraz min 3 znaki.';
        if (key === 'password' && form.password.length < 8)
            text = 'Hasło powinno mieć min 8 znaków.';
        if (key === 'confirm' && form.password !== form.confirm)
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

    if (resultInfo.isOk) {
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
            <div >{resultInfo.message}</div>
            <div className='LabelForm'>
            <label>
                Imię:
                <input
                    className="InputForm"
                    type="text"
                    name='name'
                    onChange={e => changeForm("name", e.target.value)}
                    onKeyUp={e => validation("name")}
                    style={{
                        borderColor: `${changeColor("name")}`
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
                    onChange={e => changeForm("lastname", e.target.value)}
                    onKeyUp={e => validation("lastname")}
                    style={{
                        borderColor: `${changeColor("lastname")}`
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
                    name='password'
                    onChange={e => changeForm("password", e.target.value)}
                    onKeyUp={e => validation("password")}
                    style={{
                        borderColor: `${changeColor("password")}`
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
            <button
                className="ButtonForm unactive"
                style={{
                    borderColor: `${!isValid ? 'red' : 'green'}`
                }}
                disabled={!isValid}
                type={'submit'}>ZAREJESTRUJ
            </button>
            </div>
        </form>
            </Card.Body>
    </Card>
    </div>
    </>
}
