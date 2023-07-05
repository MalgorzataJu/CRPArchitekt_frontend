import Card from "react-bootstrap/Card";
import {EmployeesList} from "../Employees/EmployeesList";

export const EmployeesView = () => (
    <>
        <div
            className="d-flex justify-content-center"
            // style={{ minHeight: "600px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header><h2>Lista Pracowników</h2></Card.Header>
                <EmployeesList/>
            </Card>
        </div>
    </>
)
