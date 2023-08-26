import { Container, Row, Col, Button } from "react-bootstrap";
import backGroundImage from "../assets/images/Home.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container  className="min-vh-100 d-flex justify-content-center align-items-center">
      <div>
        <Row className="justify-content-center align-items-center">
          <Col lg={6}>
            <div className="text-center pt-5">
              <h1>
                Star<span className="text-warning fw-bold">Mart</span>{" "}
              </h1>
              <p className="w-75 mx-auto py-2">
                Shop the latest trends and must-have items from the comfort of
                your own home. Our online store offers everything you need to
                elevate your style and simplify your life.
              </p>
              <span className="fst-italic fs-4 fw-bolder text-info">
                Ultraright Features
              </span>
              {"   "}
              <span className="fst-italic fs-4 fw-bolder text-warning">
                Ultraright Pricetag
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <img className="w-100 d-none d-lg-block" src={backGroundImage} alt="" />
          </Col>
        </Row>
        <div className="mt-4 text-center">
          <Button
            as={Link}
            to="/products"
            variant="info"
            className="fw-bolder px-4 border"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
