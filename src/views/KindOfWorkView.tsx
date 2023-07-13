
import Card from "react-bootstrap/Card";
import {HoursList} from "../Hours/HoursList";
import {KindOfWorkList} from "../KindOfWork/KindOfWorkList";
import {AddKindOfWork} from "../KindOfWork/AddKindOfWork/AddKindOfWork";

export const KindOfWorkView = () => {

    return <>
            <div
                className="d-flex justify-content-center"
            >
                <Card>
                    <Card.Header><h2>Rodzaje pracy</h2></Card.Header>
                    <KindOfWorkList/>
                    <AddKindOfWork/>
                </Card>
            </div>
    </>
}
