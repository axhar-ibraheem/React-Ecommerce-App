import React, { useRef, useState, useContext } from "react";
import ProdContext from "../store/prodContext";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Spinner, Toast, Card } from "react-bootstrap";
const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [signIn, setSignIn] = useState(true);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ctx = useContext(ProdContext);
  const history = useHistory();

  const onClickHandler = () => {
    setSignIn(!signIn);
  };

  const content = (
    <Spinner animation="border" role="status" variant="dark">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let enteredConfirmPassword;
    if (!signIn) {
      enteredConfirmPassword = confirmPassRef.current.value;
    }

    if (enteredConfirmPassword !== enteredPassword && !signIn) {
      setErrorMessage("Passwords don't match");
      setShow(true);
      setIsLoading(false);
      return;
    }

    const endPointUrl =
      signIn === true
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ctx.apiKey}`;

    try {
      const response = await fetch(endPointUrl, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        ctx.login(data.idToken, data.email);
        history.replace("/products");
      } else {
        const errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setShow(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card
        style={{ maxWidth: "30rem" }}
        className="border-0 shadow w-100 "
      >
        <Form onSubmit={onSubmitHandler} className="p-4">
          {show && (
            <Toast
              className="mx-auto bg-danger border-0 shadow my-2 w-100"
              onClose={() => setShow(false)}
              delay={4000}
              autohide
            >
              <Toast.Header className="d-flex text-bold justify-content-between">
                !!
              </Toast.Header>
              <Toast.Body className="text-light">{errorMessage} </Toast.Body>
            </Toast>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="name@example.com"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.password">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          {!signIn && (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.confirmPassword"
            >
              <Form.Label className="fw-bold">Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPassRef} required />
            </Form.Group>
          )}

          {signIn ? (
            <Button type="submit" variant="success" className="w-100 mt-2">
              {isLoading ? content : "Sign In"}
            </Button>
          ) : (
            <Button type="submit" variant="success" className="w-100 mt-2">
              {" "}
              {isLoading ? content : "Sign Up"}
            </Button>
          )}

          <Button
            onClick={onClickHandler}
            className="mx-auto mt-3 shadow-sm text-dark d-block"
            variant="outline-light"
          >
            {signIn
              ? "First Time, then Sign Up"
              : "Already a User, then Sign In"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
