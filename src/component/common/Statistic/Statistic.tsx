import { Table } from "react-bootstrap";
import {SimpleRest} from "types";

interface Props{
    date: {
        month: number,
        year: number,
    };
    hoursForProject : SimpleRest[],
    hoursForKindeOfWork: SimpleRest[],
}
export const Statistic = (props:Props)=> {

const printStatistic = (date: SimpleRest[]) => {

    return date.map((e, index)=> {
        return <tr key={index}>
            <td>{+index + 1} </td>
            <td>{e.name} </td>
            <td>{e.total_quantity} </td>
             </tr>
    })
}
    return <>
        <Table responsive>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Typ pracy</th>
                <th>Ilość godzin</th>
            </tr>
            </thead>
            <tbody>
            {
                printStatistic(props.hoursForKindeOfWork)
            }
            </tbody>
        </Table>
        <Table responsive>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Projekt</th>
                <th>Ilość godzin</th>
            </tr>
            </thead>
            <tbody>
            {
                printStatistic(props.hoursForProject)
            }
            </tbody>
        </Table>
    </>
}
