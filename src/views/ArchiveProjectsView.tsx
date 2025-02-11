import {Card} from "react-bootstrap";
import {ArchiveProjectsList} from "../Projects/Archive/ArchiveProjectsList";


export const ArchiveProjectsView = () => (
    <>
        <div
            className="d-flex justify-content-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header><h2>Lista Projektów ARCHIWALNYCH</h2></Card.Header>
                <ArchiveProjectsList/>
            </Card>
        </div>
    </>
)
