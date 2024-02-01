import {ListHourResAll } from "types";
import {Table} from "react-bootstrap";
import {HoursTableRow} from "./HoursTableRow";
import {useContext} from "react";
import {AuthContextUser} from "../auth/AuthContext";

interface Props {
    hours:ListHourResAll[];
    onHoursChange: () => void;
}

export const HoursTable = (props: Props) => {
    const { user } = useContext(AuthContextUser);

    return (<>
        <p>Użytkownik: {user?.email.split('@')[0]}</p>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Data realizacji</th>
                <th>Ilość godzin</th>
                <th>Projekt</th>
                <th>Typ pracy</th>
                {user?.role == 'Boss' && <th>Pracownik</th>}
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {
                props.hours.map(el => (
                    <HoursTableRow
                        key={el.hour.id}
                        number={el.place}
                        hour={el.hour}
                        onHoursChange={props.onHoursChange}
                    />
                ))
            }
            </tbody>
        </Table>
        </>
        )
}
