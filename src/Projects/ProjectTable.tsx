import { ListProjectSimpleResAll } from "types";
import { ProjectTableRow } from "./ProjectTableRow";
import {Table} from "react-bootstrap";

interface Props {
    projects: ListProjectSimpleResAll;
    onProjectsChange: () => void;
}

export const ProjectTable = (props: Props) => {

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Nazwa Projektu</th>
                <th>Pozostało godzin<br/> / wykonano %</th>
                <th>Planowano</th>
                <th>Wykonano</th>
                <th>Rozpoczęcie <br/>/Zakończenie</th>
                <th>Kontakt</th>
                <th>Opis</th>
                <th>Edytuj</th>
            </tr>
            </thead>
            <tbody>
            {
                props.projects.map(el => (
                    <ProjectTableRow
                        key={el.project.id}
                        number={el.place}
                        project={el.project}
                        hours={el.hours}
                        sum={el.sumOfDone}
                        onProjectsChange={props.onProjectsChange}
                    />
                ))
            }
            </tbody>
        </Table>
    )
}
