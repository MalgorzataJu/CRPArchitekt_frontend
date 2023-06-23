import React from 'react';
import {Card} from "react-bootstrap";
import {Login} from "./Login";

export const NotFoundView = () => (
        <div
            className="d-flex justify-content-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header><h2>We don't have this information :(</h2></Card.Header>
                <p>We are still working...</p>
            </Card>
            <Login/>
        </div>
)
