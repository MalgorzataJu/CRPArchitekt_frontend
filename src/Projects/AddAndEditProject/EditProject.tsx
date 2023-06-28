import React, {FormEvent, useEffect, useState} from 'react';
import {CreateProject, ProjectItemEntity} from 'types';
import './AddProject.css';
import {Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {ProjectsView} from "../../views/ProjectsView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";

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
        quantityHours: 0,
        contact: '',

    });

    useEffect(() => {
        (async () => {

            // const res =await axios.get(`${apiUrl}/project/${idOfProject}`, {
            //     withCredentials: true,
            // });
            // const project = await res.data;
            //
            // setForm({
            //     name:project.name,
            //     startDate:new Date(project.startDate).toLocaleDateString('en-CA'),
            //     endDate: new Date(project.endDate).toLocaleDateString('en-CA'),
            //     description: project.description,
            //     quantityHours: Number(project.quantityHours),
            //     contact: project.contact,
            // });
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
            // const res = await axios.put(`${apiUrl}/project/${idOfProject}`, form,
            //     {withCredentials: true}
            //     );
            // const data: ProjectItemEntity = await res.data;
            //
            // setResultInfo({status: true, message: `${data.name} has been changed.`});
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
                    Planowane godziny:
                    <input
                        className="InputForm"
                        type="number"
                        name="quantityHours"
                        value={form.quantityHours}
                        onChange={e => updateForm('quantityHours', e.target.value)}
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
            <button className="ButtonForm" type="submit">Zapisz zmiany</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
