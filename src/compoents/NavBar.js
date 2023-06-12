import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Ajouter un livre
            </Nav.Link>
            <Nav.Link as={Link} to="/seachBooks">
              Chercher un livre
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
