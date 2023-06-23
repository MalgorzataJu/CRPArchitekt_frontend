import {Container, Navbar, Nav, Button, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ReactElement, ReactNode, useContext} from "react";
import {AuthContextUser} from "../auth/AuthContext";

export const HeaderMenuLink = () => {

    const { user, isAuthenticated, logout} = useContext(AuthContextUser);

    return (
    <div className={"Content"}>
        <Navbar className="d-flex flex-row " collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container  fluid className={"Content-Header"}>
                <Navbar.Brand as={Link} to="/">RCP ARCHITEKT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {isAuthenticated && (
                        <Nav  justify className="me-auto">
                            <Nav.Link as={Link} to="/projects">Projekty</Nav.Link>
                            <Nav.Link as={Link} to="/employee">Pracownicy</Nav.Link>
                            <Nav.Link  as={Link} to="/hours">Godziny</Nav.Link>
                            <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/add-project">Projekt</NavDropdown.Item>
                                <NavDropdown.Item href="/add-employee">Pracownika</NavDropdown.Item>
                                {/*<NavDropdown.Item href="/add-task"> Zadanie</NavDropdown.Item>*/}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/add-hour">Godziny Pracy</NavDropdown.Item>
                            </NavDropdown>
                        {/*<NavDropdown title="Statystyki" id="collasible-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="/dodaj">Godziny w projektach</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">Gidziny pracowników </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#action/3.4">*/}
                        {/*        Separated link*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    )}
                    <Nav className="ms-auto">
                        {user && <Nav.Link>{user?.email}</Nav.Link>}
                        {!user && (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                    {user && (
                        <Button
                            variant="outline-success"
                            type="button"
                            onClick={() => {logout()}}
                        >
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    );
}
