import React, {SyntheticEvent, useContext, useState} from "react";
import {Button, Card,  Container, Form} from "react-bootstrap";
import {AuthContextUser} from "../auth/AuthContext";

export const Login = () => {
  const [loginPar, setLoginPer] = useState({
    email:'',
    pwd:'',
  });

  const { login } = useContext(AuthContextUser);

  const loginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

     await login(loginPar);
  };

  const changeForm = (key: string, value: any) => {
    setLoginPer(loginPar => ({
      ...loginPar,
      [key]:value,
    }));
  }

  return <>
      <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px", minWidth: "400px" }}
      ><Card className={"card-login"}>
        <Card.Header><h2>Zaloguj się:</h2></Card.Header>
          <Container >
            <Form>
                <legend></legend>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email
                    <Form.Control
                          type="text"
                          value={loginPar.email}
                          name='email'
                          onChange={e =>changeForm("email", e.target.value)}
                     />
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPasswor">
                    <Form.Label>Password:
                    <Form.Control
                        type="password"
                        value={loginPar.pwd}
                        name='pwd'
                        onChange={e =>changeForm("pwd", e.target.value)}
                    />
                    </Form.Label>
                </Form.Group>
                <Button className="ButtonForm" variant="secondary" size="lg" type="button" onClick={loginSubmit}>
                         Login
                </Button>
            </Form>
    </Container>
 </Card>
 </div>
</>
};

