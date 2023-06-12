import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Accordion,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../compoents/redux/booksApi";
import { addBook } from "../compoents/redux/booksSlice";
import FlipMove from "react-flip-move";
import { uid } from "uid";
import MySpiner from "../compoents/redux/MySpiner";

const SearchBook = () => {
  const { allBooks, isLoading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const handleSearchBook = (e) => {
    setSubject(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(
      getAllBooks(
        `https://www.googleapis.com/books/v1/volumes?q=${subject}&maxResults=20`
      )
    );
    setSubject("");
  };

  const notify = () => toast.success("Livre bien enregistrer");

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center px-0 vw-100  "
    >
      <Row className="bg-light w-100">
        <Row className="mt-4">
          <Col>
            <h2> BOOKS</h2>
            <p>Indiquer le sujet de livre à rechercher sur Google API</p>
          </Col>
        </Row>
        <Row className="d-flex  justify-content-center my-4">
          <Col xs={4}>
            <Form.Control
              name="title"
              value={subject}
              onChange={handleSearchBook}
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Quoi rechrcher?"
            />
          </Col>

          <Col xs={2}>
            <Button onClick={onsubmit} variant="primary">
              Rechercher
            </Button>
          </Col>
        </Row>
      </Row>
      <Container className="mx-auto min-vh-100   ">
        <Row className="pt-5 d-flex justify-content-center">
          <Col xs={8}>
            <FlipMove>
              <Accordion defaultActiveKey="0">
                {error ? <p>{error}</p> : null}
                {isLoading ? (
                  <MySpiner />
                ) : allBooks.items ? (
                  allBooks.items.map((book) => {
                    return (
                      <Accordion.Item key={book.id} eventKey={book.id}>
                        <Accordion.Header>
                          {" "}
                          {book.volumeInfo.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Card className="border-0 text-start">
                            <Card.Img
                              className="w-25"
                              variant="top"
                              src={book.volumeInfo.imageLinks?.thumbnail}
                              alt="books"
                            />
                            <Card.Body>
                              <Card.Title>
                                Titre: {book.volumeInfo.title}
                              </Card.Title>
                              <Card.Subtitle className="mb-2 ">
                                Auteurs: {book.volumeInfo.authors}
                              </Card.Subtitle>
                              <Card.Text>
                                Descreption: {book.volumeInfo.description}
                              </Card.Text>
                              <Card.Link
                                href={book.volumeInfo.previewLink}
                                target="_blank"
                              >
                                Plus dinfos
                              </Card.Link>
                              <Card.Link
                                onClick={() => {
                                  dispatch(
                                    addBook({
                                      id: uid(),
                                      title: book.volumeInfo.title,
                                      auteur: book.volumeInfo.authors,
                                    })
                                  );
                                  notify();
                                }}
                                href="#"
                              >
                                Enregistrer
                              </Card.Link>
                            </Card.Body>
                          </Card>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })
                ) : (
                  <p>pas de livres pour ce titre</p>
                )}
              </Accordion>
            </FlipMove>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Container>
  );
};

export default SearchBook;
