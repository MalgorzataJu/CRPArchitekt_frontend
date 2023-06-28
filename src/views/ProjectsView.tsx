
import {Card} from "react-bootstrap";

export const ProjectsView = () => (
    <>
        <div
            className="d-flex justify-content-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header><h2>Lista Projektów w realizacji</h2></Card.Header>
                {/*<ProjectsList/>*/}
            </Card>
        </div>
    </>
)
