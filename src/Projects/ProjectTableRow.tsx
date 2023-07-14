import {ListKindOfHourForProject, ProjectSimpleRes} from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../config/api";

interface Props {
    project: ProjectSimpleRes;
    hours:ListKindOfHourForProject[];
    sum:number;
    number: number;
    onProjectsChange: () => void;
}

export const ProjectTableRow = (props: Props) => {
    const hourToDo =props.project.quantityHours-props.sum;
    const prc = ((props.sum/props.project.quantityHours)*100);
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
            alert(`Error occurred: ${error.message}`);
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

                <div> {hourToDo.toFixed(2)}/{prc.toFixed()}%</div>
                <div
                    style={{
                        backgroundColor:(hourToDo < 0)?'#f30303':'#0d6efd',
                        color:'white',
                        display:'block',
                        width:`${prc % 100}%`,
                        height:'10px',
                } }
                >
              </div>
                { (hourToDo < 0) &&(<span>Przekroczono ilośc godzin</span>)}
            </td>
            <td>
                {props.project.quantityHours}
            </td>
            <td>
                <table>
                    <tr>
                        {
                            props.hours.map((el, index) =>(
                                <tr key ={index}>
                                    {el.kindofwork}: {el.sumKindOfWork.toFixed(2)}
                                </tr>
                            ))
                        }
                    </tr>
                </table>
            </td>
            <td>
                {props.project.startDate}
            </td>
            <td>
                {props.project.endDate}
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


