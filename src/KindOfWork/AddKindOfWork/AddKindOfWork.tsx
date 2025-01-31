import React, {FormEvent, useEffect, useState} from 'react';
import {CreateHourRecord, CreateProject, ListAllToAddHoursRes, ProjectItemEntity} from 'types';
import {Card} from "react-bootstrap";
import {HoursView} from "../../views/HoursView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";
import { toast } from "react-toastify";
import {ProjectsView} from "../../views/ProjectsView";

interface Props {
    // onHoursChange: () => void;
}

export const AddKindOfWork = (props: Props) => {
    const [form, setForm] = useState({
        hourstype: '',
        price:0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });

    const validate = ():boolean => {
        if (form.hourstype === null || form.hourstype.length < 3) {
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
                const res = await fetch(`${apiUrl}/kindofwork`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(form),
                });
                const data: ProjectItemEntity = await res.json();
                toast.success("Rodzaj godzin został dodany");
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
            style={{ minHeight: "500px", minWidth: "500px"}}
        ><Card>
            <Card.Header><h2>Dodaj rodzaj godzin pracy</h2></Card.Header>
            <Card.Body>
                <p>{resultInfo.message}</p>
                <form onSubmit={sendForm} >
                    <div className='LabelForm'>
                        <label>
                            Nazwa godzin:
                            <input
                                className="InputForm"
                                type="text"
                                value={form.hourstype}
                                onChange={e => updateForm('hourstype', e.target.value)}
                            /><br/>
                        </label>
                    </div>
                    <div className='LabelForm'>
                        <label>
                            Stawka:
                            <input
                                className="InputForm"
                                name="number"
                                value={form.price}
                                onChange={e => updateForm('price', e.target.value)}
                            />
                        </label>
                    </div>
                    <button className="ButtonForm" type="submit" >Dodaj</button>
                </form>
            </Card.Body>
        </Card>
        </div>
    </>
};
