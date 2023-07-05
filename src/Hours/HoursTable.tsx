import {ListHourResAll } from "types";
import {Table} from "react-bootstrap";
import {HoursTableRow} from "./HoursTableRow";

interface Props {
    hours:ListHourResAll[];
    onHoursChange: () => void;
}

export const HoursTable = (props: Props) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Projekt</th>
                <th>Pracownik</th>
                <th>Typ pracy</th>
                <th>Ilość godzin</th>
                <th>Data realizacji</th>
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
    )
}
