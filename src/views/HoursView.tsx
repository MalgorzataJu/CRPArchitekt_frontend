
import Card from "react-bootstrap/Card";
import {HoursList} from "../Hours/HoursList";

export const HoursView = () => {
     return <>
            <div
                className="d-flex justify-content-center"
            >
                <Card>
                    <Card.Header><h2>Lista Godzin </h2></Card.Header>
                    <HoursList/>
                </Card>
            </div>
    </>
}
