import React, {FormEvent, useEffect, useState} from 'react';
import {CreateHourRecord, ListAllToAddHoursRes} from 'types';
import {Card} from "react-bootstrap";
import {HoursView} from "../../views/HoursView";
import {apiUrl} from "../../config/api";
import {Spinner} from "../../component/common/spiner/spinner";
import { toast } from "react-toastify";

interface Props {
    // onHoursChange: () => void;
}

export const AddHours = (props: Props) => {

    const [data, setData] = useState<ListAllToAddHoursRes >({
        employeeList: [],
        kindofworkList: [],
        projectList: [],
    })

    const [form, setForm] = useState<CreateHourRecord>({
        projectId: '',
        employeeId: '',
        kindofworkId: '',
        quantity: 1,
        date: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const refreshHours = async () => {

        try {
            const apiResponse = await fetch(`${apiUrl}/hour/add`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await apiResponse.json();
            setData(result);
            setForm({
                            projectId: result.projectList[0].id,
                            employeeId: result.employeeList[0].id,
                            kindofworkId: result.kindofworkList[0].id,
                            quantity: 10,
                            date:  new Date().toLocaleDateString('en-CA'),
                        })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshHours();
    }, []);


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const apiResponse = await fetch(`${apiUrl}/hour`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            const result = await apiResponse.json();
            console.log(result)

        } finally {

            setLoading(false);
        }
        // props.onHoursChange();
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo) {
        return <HoursView/>
    }

    return <>
            <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "800px", }}
            ><Card>
            <Card.Header><h2>Dodaj Godziny pracy</h2></Card.Header>
            <Card.Body>
            <form onSubmit={sendForm}>
            <div className='LabelForm'>
                Pracownik:
                <select
                    className="InputForm"
                    value={form.employeeId}
                    onChange={e => updateForm('employeeId', e.target.value)}
                >
                    {
                        data.employeeList.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                Project:
                <select
                    className="InputForm"
                    value={form.projectId}
                    onChange={e => updateForm('projectId', e.target.value)}
                >
                    {
                        data.projectList.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                Rodzaj:
                <select
                    className="InputForm"
                    value={form.kindofworkId}
                    onChange={e => updateForm('kindofworkId', e.target.value)}
                >
                    {
                        data.kindofworkList.map(k => (
                            <option key={k.id} value={k.id}>
                                {k.hourstype}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                <label>
                    Data wykonania:
                    <input
                        className="InputForm"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={e => updateForm('date', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Ilość godzin:
                    <input
                        className="InputForm"
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={e => updateForm('quantity', e.target.value)}
                    /><br/>
                </label>
            </div>
            <button className="ButtonForm" type="submit">Dodaj</button>
        </form>
      </Card.Body>
    </Card>
  </div>
 </>
};
