import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import ProdContext from "../../store/prodContext";
import { useContext, useEffect } from "react";

const Mainnav = (props) => {
  const ctx = useContext(ProdContext);
  const prodQuantity = ctx.products.length;
  const useremail = ctx.email?.replace(/[.]/g, "") ?? undefined;

  useEffect(() => {
    async function fetchCartItems() {
      const response = await fetch(
        `https://ecommerce-app-a6739-default-rtdb.firebaseio.com/cart${useremail}.json`
      );
      const data = await response.json();
      if (response.ok) {
        ctx.replaceCart(data);
      } else {
        const error = data.error.message;
        alert(error);
      }
    }
    fetchCartItems();
  // eslint-disable-next-line
  }, [useremail]);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand className="fw-bold d-none d-lg-block ps-lg-5">
          Star<span className="text-warning fs-3 fw-bold">Mart</span>
        </Navbar.Brand>
        <Navbar.Toggle className="border-0 p-0 ms-3" />
        <Navbar.Collapse className="ps-3 pt-3 pt-lg-0" id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link className="fs-5 fw-bold" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="fs-5 fw-bold" as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link className="fs-5 fw-bold" as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="fs-5 fw-bold" as={Link} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex ps-3  pt-2 pt-lg-0 pe-lg-5" to="/auth">
          {!!ctx.idToken ? (
            <Button
              onClick={ctx.logout}
              variant="outline-info"
              className="fw-bold text-light"
            >
              Log Out
            </Button>
          ) : (
            <Button
              as={Link}
              to="/auth"
              variant="outline-info"
              className="fw-bold text-light"
            >
              Log In
            </Button>
          )}

          <Button
            onClick={() => props.onShow()}
            variant="warning"
            className="ms-4 p-0 px-3 fw-bolder text-dark rounded-pill border-0"
          >
            <div className="position-relative">
              <i className="bi bi-cart4 fs-4 px-3"></i>
              <span className="position-absolute top-0 end-0 text-danger">
                {prodQuantity}
              </span>
            </div>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Mainnav;
