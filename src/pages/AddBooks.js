import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MySpiner from "../compoents/redux/MySpiner";
import FlipMove from "react-flip-move";

import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from "../compoents/redux/booksSlice";
import { uid } from "uid";

const AddBooks = () => {
  const [book, setBook] = useState({ id: uid(), title: "", auteur: "" });
  const [books, setBooks] = useState([]);
  const handleChangeBook = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const myBooks = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(book));
    setBook({ id: uid(), title: "", auteur: "" });
  };

  useEffect(() => {
    setBooks(myBooks.books);
  }, [myBooks]);

  return (
    <Container fluid className="d-flex flex-column justify-content-center px-0 ">
      <Row className="bg-light vw-100">
        <Row className="mt-4">
          <Col>
            <h2> BOOKS</h2>
            <p>Ajouter un livre à votre bibliothèque</p>
          </Col>
        </Row>
        <Row className="d-flex   justify-content-center my-4 ms-2">
          <Col sm={3} className="mb-2">
            <Form.Control
              name="title"
              value={book.title}
              onChange={handleChangeBook}
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Titre"
            />
          </Col>
          <Col sm={3} className="mb-4">
            <Form.Control
              name="auteur"
              value={book.auteur}
              onChange={handleChangeBook}
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Auteur"
            />
          </Col>
          <Col sm={2}>
            <Button onClick={onsubmit} variant="primary">
              Ajouter un livre{" "}
            </Button>
          </Col>
        </Row>
      </Row>
      <Container className="mx-auto py-3 vh-100">
        <Row className=" d-flex  justify-content-center ">
          <Col sm={10}>
            <ListGroup className="text-start ps-3">
              <FlipMove>
                {myBooks.error ? <p>{myBooks.error}</p> : null}
                {myBooks.isLoading ? (
                  <MySpiner />
                ) : (
                  books.map((book) => {
                    return (
                      <ListGroup.Item key={book.id}>
                        <Row>
                          <Col sm={5}>
                            <p>Titre: {book.title}</p>
                          </Col>
                          <Col sm={5}>
                            <p>Autteur: {book.auteur}</p>
                          </Col>
                          <Col sm={2}>
                            <Button
                              onClick={() => dispatch(deleteBook(book.id))}
                              variant="danger"
                            >
                              X
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                )}
              </FlipMove>
            </ListGroup>
            <div className="text-center mt-4 ">
              {books.length > 0 ? (
                <Button
                  onClick={() => dispatch(deleteAllBooks())}
                  variant="danger"
                >
                  Effacer tous les livres
                </Button>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddBooks;
