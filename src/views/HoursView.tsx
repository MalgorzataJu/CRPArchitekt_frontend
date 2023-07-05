
import Card from "react-bootstrap/Card";
import {HoursList} from "../Hours/HoursList";

export const HoursView = () => {

    return <>
            <div
                className="d-flex justify-content-center"
                // style={{ minHeight: "500px", minWidth: "600px" }}
            >
                <Card>
                    <Card.Header><h2>Lista Godzin</h2></Card.Header>
                    <HoursList/>
                </Card>
            </div>
    </>
}
