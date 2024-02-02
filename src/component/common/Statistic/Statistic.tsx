import { Table } from "react-bootstrap";
import {SimpleRest} from "types";
import {useContext} from "react";
import {AuthContextUser} from "../../../auth/AuthContext";

interface Props{
    date: {
        month: number,
        year: number,
    };
    hoursForProject : SimpleRest[],
    hoursForKindeOfWork: SimpleRest[],
    totalMonthlyHours:number,
    totalMonthlyHoursForEmployee: SimpleRest[],
}
export const Statistic = (props:Props)=> {
    const { user } = useContext(AuthContextUser);

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
        {user?.role == 'Boss' && <Table responsive>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Pracownik</th>
                <th>Ilość godzin</th>
            </tr>
            </thead>
            <tbody>
            {
                printStatistic(props.totalMonthlyHoursForEmployee)
            }
            </tbody>
        </Table>}

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
            <tr>
                <td colSpan={3} style={{ textAlign: 'right', fontWeight:'bold' }} > Razem: {props.totalMonthlyHours}</td>
            </tr>
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
