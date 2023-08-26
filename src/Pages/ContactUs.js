import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const ContactUs = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNoRef = useRef();
  const [show, setShow] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const details = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phoneNo: phoneNoRef.current.value,
    };

    try {
      const response = await fetch(
        "https://react-http-4a6c0-default-rtdb.firebaseio.com/contacts.json",
        {
          method: "POST",
          body: JSON.stringify(details),
        }
      );
      if (response.ok) {
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setShow(true);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(time);
  }, [show]);

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center mx-2 mx-lg-0 mt-5 pb-4">
        <div className="text-center mt-4 pb-3">
          <h1 className="fw-bold">
            Contact <span className="text-info">Us</span>{" "}
          </h1>
          {show && (
            <div className="text-success fs-5">
              Thanks for contacting us. We will look back to you very soon!
            </div>
          )}
        </div>
        <Col lg="5" className="bg-gradient bg-info px-4 py-4">
          <div>
            <h3 className="fw-bold text-light">Contact Information</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
              vitae repudiandae consequatur saepe ullam vel, commodi id nostrum
              fuga sapiente!
            </p>
          </div>
          <div className="pb-2">
            <i className="bi bi-envelope-at-fill me-2 text-danger"></i>
            <span>example@gmail.com</span>
          </div>
          <div className="py-2">
            <i className="bi bi-telephone-fill me-2 text-danger"></i>
            <span>0123456789</span>
          </div>
          <div className="py-2">
            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
            <span>Old Plaza, Palladium Street, New Delhi.</span>
          </div>
        </Col>
        <Col lg="4" className="py-3 px-4  shadow">
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Enter Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhonenumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                ref={phoneNoRef}
                type="number"
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <Button className="mt-2 px-3 fw-bold" variant="info" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
