import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import { ProjectSimpleRes } from 'types';
import {  Button, Card, Table} from "react-bootstrap";
import {apiUrl} from "../config/api";

export const SingleProjectView = () => {
    const [project, setProject] = useState<ProjectSimpleRes | null>(null);
    const {idOfProject} = useParams();

    useEffect(() => {
        (async () => {

            const res =await fetch(`${apiUrl}/project/${idOfProject}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setProject(data);

        })();
    }, []);

    if (project === null) {
        return null;
    }

    return <>
        <div
            className="d-flex justify-content-center"
        >
            <Card>
                <Card.Header><h2>Project: {project.name}</h2></Card.Header>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <th>Nazwa Projektu:</th>
                        <td>{project.name}</td>
                    </tr>
                    <tr>
                        <th>Inwestor:</th>
                        <td>{project.contact}</td>
                    </tr>
                    <tr>
                        <th>Opis:</th>
                        <td>{project.description}</td>
                    </tr>
                    <tr>
                        <th>Przewidziana ilość godzin:</th>
                        <td>{project.quantityHours}</td>
                    </tr>
                    <tr>
                        <th>Początek projektu:</th>
                        <td>{new Date(project.startDate).toLocaleDateString('en-CA')}</td>
                    </tr>
                    <tr>
                        <th>Początek projektu:</th>
                        <td>{new Date(project.endDate).toLocaleDateString('en-CA')}</td>
                    </tr>
                    <tr>
                        <th>Zakończony:</th>
                        <td>Nie</td>
                    </tr>
                    </tbody>
                </Table>
                <Link to={`/project/edit/${idOfProject}`}>
                    <Button variant="secondary">
                        Edit
                    </Button>
                </Link>
            </Card>
        </div>
    </>;
};
