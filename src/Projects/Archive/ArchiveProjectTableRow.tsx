import {ListKindOfHourForProject, ProjectBaseInfo} from "types";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {apiUrl} from "../../config/api";

interface Props {
    project: ProjectBaseInfo;
    number: number;
    onProjectsChange: () => void;
}

export const ArchiveProjectTableRow = (props: Props) => {

    const deleteProject = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.project.name}?`)) {
            return;
        }

        const res = await fetch(`${apiUrl}/project/${props.project.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            toast(`Error occurred: ${error.message}`);
            return;
        }

        props.onProjectsChange();
    };

    return (
        <tr>
            <th>{props.number}</th>
            <td>
                <Link to={`/project/${props.project.id}`}>
                {props.project.name}
                </Link>

            </td>
            <td>
                {props.project.contact}
            </td>
            <td>
                {props.project.description}
            </td>
            <td>
                <a href="#" onClick={deleteProject}>🗑️</a>
                <Link to={`/project/edit/${props.project.id}`}> 🖋️</Link>

            </td>
        </tr>
    );
};


