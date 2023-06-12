import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="mt-5 bg-secondary text-white  ">
      <Row className="  py-3">
        <Col>
          <p className="m-0">©Projet realiser par MohamedAmine</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
