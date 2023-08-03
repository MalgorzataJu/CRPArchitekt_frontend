import React, {FormEvent, useEffect, useState} from 'react';
import {CreateProject, ProjectItemEntity} from 'types';
import {Card} from "react-bootstrap";
import {ProjectsView} from "../../views/ProjectsView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";
import '../../Layout/style.css';
import {toast} from "react-toastify";

export const AddProject = () => {
    const [form, setForm] = useState<CreateProject>({
        name: '',
        startDate:new Date().toLocaleDateString('en-CA'),
        endDate: new Date().toLocaleDateString('en-CA'),
        description: '',
        contact: '',
        stocktaking: 0,
        conception: 0,
        setOf: 0,
        excess: 0,
        executive : 0,
        control : 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });

    const validate = ():boolean => {
        if (form.name === null || form.name.length < 3) {
            setResultInfo({status: false, message: "Nazwa powinna być dłuższa niż 3 znaki."})
            return false;
        } else {
            setResultInfo({status: false, message: ""})
            return true;
        }
    }

    const updateForm = (key: string, value: any) => {

       validate();
        setForm(form => ({
            ...form,
            [key]: value,
        }));

    };

    useEffect(() => {

    }, [form]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
                if (validate()) {
                    const res = await fetch(`${apiUrl}/project`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(form),
                    });
                    const data: ProjectItemEntity = await res.json();
                    toast.success("Udało się");
                    setResultInfo({status: true, message: `${data.name} has been created.`});
                }

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo.status) {
        return  <ProjectsView/>
    }

    return <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "500px"}}
            ><Card>
            <Card.Header><h2>Dodaj projekt</h2></Card.Header>
            <Card.Body>
                <p>{resultInfo.message}</p>
            <form onSubmit={sendForm} className="AddProject">
            <div className='LabelForm'>
                <label>
                    Nazwa projektu:
                    <input
                        className="InputForm"
                        type="text"
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Opis projektu:
                    <textarea
                        className="InputForm"
                        name="description"
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </div>
                <div className='LabelForm'>
                <label>
                    Początek realizacji:
                    <input
                        className="InputForm"
                        type="date"
                        name = "startDate"
                        value={form.startDate}
                        onChange={e => updateForm('startDate', e.target.value)}
                    />
                </label>
                </div>
                <div className='LabelForm'>
                <label >
                    Koniec realizacji:
                    <input
                        className="InputForm"
                        type="date"
                        name = "endDate"
                        value={form.endDate}
                        onChange={e => updateForm('endDate', e.target.value)}
                    />
                </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Inwentaryzacja:
                        <input
                            className="InputForm"
                            type="number"
                            name="stocktaking"
                            value={form.stocktaking}
                            onChange={e => updateForm('stocktaking', e.target.value)}
                        /><br/>
                    </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Koncepcja:
                        <input
                            className="InputForm"
                            type="number"
                            name="conception"
                            value={form.conception}
                            onChange={e => updateForm('conception', e.target.value)}
                        /><br/>
                    </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Zestawienie materiałów:
                        <input
                            className="InputForm"
                            type="number"
                            name="setOf"
                            value={form.setOf}
                            onChange={e => updateForm('setOf', e.target.value)}
                        /><br/>
                    </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Wykonawczy:
                        <input
                            className="InputForm"
                            type="number"
                            name="executive"
                            value={form.executive}
                            onChange={e => updateForm('executive', e.target.value)}
                        /><br/>
                    </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Dodatkowe:
                        <input
                            className="InputForm"
                            type="number"
                            name="excess"
                            value={form.excess}
                            onChange={e => updateForm('excess', e.target.value)}
                        /><br/>
                    </label>
                </div>
                <div className='LabelForm'>
                    <label>
                        Nadzór:
                        <input
                            className="InputForm"
                            type="number"
                            name="control"
                            value={form.control}
                            onChange={e => updateForm('control', e.target.value)}
                        /><br/>
                    </label>
                </div>

            <div className='LabelForm'>
                <label>
                    <p>Kontakt:</p>
                    <input
                        className="InputForm"
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={e => updateForm('contact', e.target.value)}
                    /><br/>
                </label>
            </div>
            <button className="ButtonForm" type="submit" >Dodaj</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
