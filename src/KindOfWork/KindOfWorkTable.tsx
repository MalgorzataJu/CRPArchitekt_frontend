import {ListKindOfWorkRes, ListProjectSimpleResAll} from "types";
import {Table} from "react-bootstrap";
import {KindOfWorkTableRow} from "./KindOfWorkTableRow";

interface Props {
    kow: ListKindOfWorkRes[];
    onKindOfWorkChange: () => void;
}

export const KindOfWorkTable = (props: Props) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Rodzaj pracy</th>
                <th>Stawka</th>
                {/*<th>Edytuj</th>*/}
            </tr>
            </thead>
            <tbody>

            { props.kow.map(el => (
                     <KindOfWorkTableRow
                         key={el.kow.id}
                         kow={el.kow}
                         place={el.place}
                         onKindOfWorkChange={props.onKindOfWorkChange}
                     />
                ))
            }
            </tbody>
        </Table>
    )
}
