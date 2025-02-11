import React, {FormEvent, useEffect, useState} from 'react';
import {CreateProject} from 'types';
import {Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {ProjectsView} from "../../views/ProjectsView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";
import '../../Layout/style.css';

export const EditProject = () => {
    const {idOfProject} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });
    const [form, setForm] = useState<CreateProject>({
        name: '',
        startDate:'',
        endDate: '',
        description: '',
        contact: '',
        stocktaking: 0,
        conception: 0,
        setOf: 0,
        excess: 0,
        executive : 0,
        control : 0,
        isActive: false,
    });

    useEffect(() => {
        (async () => {

            const res =await fetch(`${apiUrl}/project/${idOfProject}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const project = await res.json();

            setForm({
                name:project.name,
                startDate:new Date(project.startDate).toLocaleDateString('en-CA'),
                endDate: new Date(project.endDate).toLocaleDateString('en-CA'),
                description: project.description,
                contact: project.contact,
                stocktaking: project.stocktaking,
                conception: project.conception,
                setOf: project.setOf,
                excess: project.excess,
                executive : project.executive,
                control : project.control,
                isActive: project.isActive,
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
            const res = await fetch(`${apiUrl}/project/${idOfProject}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            setResultInfo({status: true, message: `has been changed.`});
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
                style={{  minWidth: "500px", }}
            ><Card>
            <Card.Header><h2>Edytuj projekt:</h2></Card.Header>
            <Card.Body>
                <div>{resultInfo.message}</div>
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
                        Zestawienie mat.:
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
                    Kontakt:
                    <input
                        className="InputForm"
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={e => updateForm('contact', e.target.value)}
                    /><br/>
                </label>
            </div>

                <div className='LabelForm'>
                    <label>
                        Status projektu:
                        <select
                            name="isActive"
                            value={form.isActive? 'Active' : 'Archived'}
                            onChange={e => updateForm('isActive', e.target.value =='Active')}
                            className="InputForm"
                        >
                            <option value="Active">Aktywny</option>
                            <option value="Archived">Archiwalny</option>
                        </select>
                    </label>
                </div>
            <button className="ButtonForm" type="submit">Zapisz zmiany</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
