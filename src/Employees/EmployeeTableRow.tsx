import React from "react";
import {ListEmployeeRespon} from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../config/api";

interface Props {
    key: string | undefined,
    place: number,
    employee: ListEmployeeRespon,
    onEmployeeChange: () => void;
}

export const EmployeeTableRow = (props: Props) => {

    const deleteEmployee = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.employee.name}?`)) {
            return;
        }

        // axios.delete(`${apiUrl}/employee/${props.employee.id}`,
        //     {withCredentials: true}
        // )
        //     .then((res) => {
        //         if ([400, 500].includes(res.status)) {
        //             const error = res.statusText;
        //             alert(`Error occurred: ${error}`);
        //             return;
        //         }
        //     });
        props.onEmployeeChange();
    };


    return (
        <tr className="UserListOneItem">
            <th>{props.place}</th>
            <td>
                <Link to={`/employee/${props.employee.id}`}>
                    {props.employee.name}
                </Link>
            </td>
            <td>
                {props.employee.lastname}
            </td>
            <td>
                {props.employee.email}
            </td>
            <td>
                {props.employee.hourly}
            </td>
            <td>
                <a href="#" onClick={deleteEmployee}>🗑️</a>
                <Link to={`/employee/edit/${props.employee.id}`}> 🖋️</Link>
            </td>

        </tr>
    )
};
