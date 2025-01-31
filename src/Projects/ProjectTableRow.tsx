import {ListKindOfHourForProject, ProjectSimpleRes} from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../config/api";
import {toast} from "react-toastify";

interface Props {
    project: ProjectSimpleRes;
    hours:ListKindOfHourForProject[];
    sum:number;
    number: number;
    onProjectsChange: () => void;
}

export const ProjectTableRow = (props: Props) => {
    const hourToDo =props.project.quantityHours - props.sum;
    const prc = ((props.sum / props.project.quantityHours) * 100);

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
    const calculate = (kindofhour: string, sumAll:number) => {
        const sumDone = props.hours.find(h=> h.kindofwork === kindofhour)?.sumKindOfWork??0;

        return <>{sumAll - sumDone}/{(sumDone/sumAll*100).toFixed(2)}%</>
    }
    return (
        <tr>
            <th>{props.number}</th>
            <td>
                <Link to={`/project/${props.project.id}`}>
                {props.project.name}
                </Link>
                <div  style={{border:`1px outset `}}>
                    <div
                        style={{
                            backgroundColor:(hourToDo < 0)?'#f30303':'#0d6efd',
                            color:'white',
                            width:`${prc % 100}%`,
                            lineHeight:'100%',
                            height:'1rem',
                        } }
                    ></div>
                </div>
                { (hourToDo < 0) &&(< >Przekroczono ilośc godzin: <span style={{color: 'red'}}>{hourToDo * (-1)}</span></>)}
            </td>
            <td>
                <div> {hourToDo.toFixed(2)}/ {isFinite(prc)?prc.toFixed(2):""}</div>
                <table>
                    <tbody>
                    {( props.project.stocktaking > 0)&&(
                        <tr>
                            <td>Inwentaryzacja</td>
                            <td>{calculate("INWENTARYZACJA", props.project.stocktaking)}</td>
                        </tr>
                    )} {( props.project.conception > 0)&&(
                    <tr>
                        <td>Koncepcja</td>
                        <td>{calculate("KONCEPCJA",props.project.conception )}</td>
                    </tr>
                )} {( props.project.setOf > 0)&&(
                    <tr>
                        <td>Zestawienie mat.</td>
                        <td>{calculate("Zestawienie materiałów",props.project.setOf )}</td>
                    </tr>
                )} {( props.project.executive > 0)&&(
                    <tr>
                        <td>Wykonawczy</td>
                        <td>{calculate("WYKONAWCZY",props.project.executive )}</td>
                    </tr>
                )} {( props.project.excess > 0)&&(
                    <tr>
                        <td>Dodatkowe</td>
                        <td>{calculate("DODATKOWE",props.project.excess )}</td>
                    </tr>
                )} {( props.project.control > 0)&&(
                    <tr>
                        <td>Nadzór</td>
                        <td>{calculate("NADZÓR",props.project.control )}</td>
                    </tr>
                )}
                        </tbody>
                </table>
            </td>
            <td>
                {props.project.quantityHours}
                <table>
                    <tbody>
                    {( props.project.stocktaking > 0)&&(
                        <tr>
                            <td>Inwentaryzacja</td>
                            <td>{props.project.stocktaking}</td>
                        </tr>
                    )} {( props.project.conception > 0)&&(
                    <tr>
                        <td>Koncepcja</td>
                        <td>{props.project.conception}</td>
                    </tr>
                )} {( props.project.setOf > 0)&&(
                    <tr>
                        <td>Zestawienie mat.</td>
                        <td>{props.project.setOf}</td>
                    </tr>
                )} {( props.project.executive > 0)&&(
                    <tr>
                        <td>Wykonawczy</td>
                        <td>{props.project.executive}</td>
                    </tr>
                )} {( props.project.excess > 0)&&(
                    <tr>
                        <td>Dodatkowe</td>
                        <td>{props.project.excess}</td>
                    </tr>
                )} {( props.project.control > 0)&&(
                    <tr>
                        <td>Nadzór</td>
                        <td>{props.project.control}</td>
                    </tr>
                    )}
                    </tbody>
                </table>
            </td>
            <td>
                <table>
                    <tbody>
                    <tr><td>{props.hours.reduce((a,b) => (a + b.sumKindOfWork),0).toFixed(2)}</td></tr>
                        {
                            props.hours.map((el, index) =>(
                                <tr key ={index}>
                                    <td>{el.kindofwork} {el.sumKindOfWork.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
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


