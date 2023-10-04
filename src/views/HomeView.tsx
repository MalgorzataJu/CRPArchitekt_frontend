import {Card} from "react-bootstrap";

export const HomeView = () => (
    <>
        <div
            className="d-flex justify-content-center"
            style={{ margin: "30px"}}
        >
        <Card className="text-center">
        <h1>RCP Architekt  </h1>
        <Card.Body>
            <Card.Title>Witam na stronie platformy.</Card.Title>
                <h6>Platforma służy do rejestracji czasu pracy.</h6>
                <h6>Musisz być zalogowany</h6>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
        </div>
      </>
);

