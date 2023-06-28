import { ProjectSimpleRes} from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../config/api";

interface Props {
    project: ProjectSimpleRes;
    number: number;
    onProjectsChange: () => void;
}

export const ProjectTableRow = (props: Props) => {

    const deleteProject = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.project.name}?`)) {
            return;
        }

        // const res = await axios.delete(`${apiUrl}/project/${props.project.id}`, {
        //     withCredentials: true,
        // });
        //
        // if ([400, 500].includes(res.status)) {
        //     const error = await res.data;
        //     alert(`Error occurred: ${error.message}`);
        //     return;
        // }

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
                {props.project.description}
            </td>
            <td>
                {props.project.startDate}
            </td>
            <td>
                {props.project.endDate}
            </td>
            <td>
                {props.project.quantityHours}
            </td>
            <td>
                Ilośc godzin wypracowana
            </td>
            <td>
                {props.project.contact}
            </td>
            <td>
                <a href="#" onClick={deleteProject}>🗑️</a>
                <Link to={`/project/edit/${props.project.id}`}> 🖋️</Link>

            </td>
        </tr>
    );
};


