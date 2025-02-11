import { ListProjectSimpleResArchive } from "types";
import {Table} from "react-bootstrap";
import {ArchiveProjectTableRow} from "./ArchiveProjectTableRow";

interface Props {
    projects: ListProjectSimpleResArchive;
    onProjectsChange: () => void;
}

export const ArchiveProjectTable = (props: Props) => {

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Nazwa Projektu</th>
                <th>Kontakt</th>
                <th>Opis</th>
                <th>Edytuj</th>
            </tr>
            </thead>
            <tbody>
            {
                props.projects.map(el => (
                    <ArchiveProjectTableRow
                        key={el.project.id}
                        number={el.place}
                        project={el.project}
                        onProjectsChange={props.onProjectsChange}
                    />
                ))
            }
            </tbody>
        </Table>
    )
}
