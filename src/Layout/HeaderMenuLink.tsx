import {Container, Navbar, Nav, Button, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ReactElement, ReactNode, useContext, useEffect} from "react";
import {AuthContextUser} from "../auth/AuthContext";

export const HeaderMenuLink = () => {

    const { user, isAuthenticated, login, logout} = useContext(AuthContextUser);

    return (
    <div className={"Header"}>
        <Navbar className="d-flex flex-row " collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container  fluid className={"Content-Header"}>
                <Navbar.Brand as={Link} to="/">RCP ARCHITEKT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    {isAuthenticated &&(<>
                            <Nav.Link as={Link} to="/projects">Projekty</Nav.Link>
                            {/*<Nav.Link as={Link} to="/tasks">Zadania</Nav.Link>*/}
                            <Nav.Link  as={Link} to="/hours">Godziny</Nav.Link>
                            <Nav.Link as={Link} to="/add-hour"> <span style={{color:'yellow'}}>DODAJ Godziny</span></Nav.Link>
                            {user?.role == 'Boss' && (
                                <Nav.Link as={Link} to="/employee">Pracownicy</Nav.Link>
                            )}
                            <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/add-project">Projekt</NavDropdown.Item>
                                {user?.role == 'Boss' && (
                                    <NavDropdown.Item href="/add-employee">Pracownika</NavDropdown.Item>
                                    )}
                                <NavDropdown.Item href="/add-task"> Zadanie</NavDropdown.Item>
                                <NavDropdown.Item href="/kindofwork">Rodzaje Godzin</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/*<NavDropdown.Item href="/add-hour">Godziny Pracy</NavDropdown.Item>*/}
                            </NavDropdown>
                            <Nav.Link as={Link} to="/archiveprojects">Projekty Archiwalne</Nav.Link>
                        </>
                        )}
                    </Nav>
                    {user && (
                        <Nav className="nav justify-content-end">
                            <NavDropdown title={user?.email} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/add-project">Moje Projekty</NavDropdown.Item>
                                <NavDropdown.Item href="/add-task"> Moje Zadanie</NavDropdown.Item>
                                <NavDropdown.Item href="/add-employee">Konto</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Button
                                    className="btn-block btn-logout"
                                    variant="outline-dark "
                                    type="button"
                                    onClick={() => {logout()}}
                                >
                                    Logout
                                </Button>
                            </NavDropdown>
                        </Nav>
                    )}
                    {!user && (
                        <Nav className="nav justify-content-end">
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    );
}
