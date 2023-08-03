import {KindOfWorkItemEntity, ProjectSimpleRes} from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../config/api";

interface Props {
    kow: KindOfWorkItemEntity;
    place: number,
    onKindOfWorkChange: () => void;
}

export const KindOfWorkTableRow = (props: Props) => {

    const deleteProject = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.kow.hourstype}?`)) {
            return;
        }

        const res = await fetch(`${apiUrl}/kindofwork/${props.kow.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onKindOfWorkChange();
    };
    return (
        <tr>
            <th>{props.place}</th>
            <td>
                <Link to={`/kindofwork/${props.kow.id}`}>
                {props.kow.hourstype}
                </Link>
            </td>
            <td>
                    {props.kow.price}
            </td>
            {/*<td>*/}
            {/*    <a href="#" onClick={deleteProject}>🗑️</a>*/}
            {/*</td>*/}
        </tr>
    );
};


