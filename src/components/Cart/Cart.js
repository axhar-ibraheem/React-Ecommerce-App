import CartItems from "./CartItems";
import ProdContext from "../../store/prodContext";
import { useContext } from "react";
import { Button, Row, Col, Offcanvas } from "react-bootstrap";
const Cart = (props) => {
  const ctx = useContext(ProdContext);

  return (
    <Offcanvas
      scroll={true}
      backdrop={true}
      placement="end"
      restoreFocus={false}
      show={props.onShow}
      className="px-3"
    >
      <Offcanvas.Body>
        <div className="w-100 text-end">
          <Button
            variant="danger"
            size="sm"
            className="mx-auto"
            onClick={props.onHide}
          >
            X
          </Button>
        </div>

        <Offcanvas.Header className="d-flex justify-content-center  bg-dark text-light rounded-pill mt-4 fw-bolder fs-5 rounded mb-3">
          Your Cart <i className="ps-2 bi bi-cart4 text-warning"></i>
        </Offcanvas.Header>

        {ctx.products.length > 0 && (
          <Row className="mb-3 justify-content-between">
            <Col>
              <h5 className="fw-bold">Product</h5>
            </Col>
            <Col>
              <h5 className="fw-bold">Price</h5>
            </Col>
            <Col className="d-flex">
              <h5 className="mx-auto fw-bold">Quantity</h5>
            </Col>
          </Row>
        )}

        {ctx.products.map((item) => (
          <CartItems
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            key={item.id}
            id={item.id}
          />
        ))}
        {!!!ctx.idToken && (
          <div className="text-center">
            <span>Please login to see what is in your cart</span>
          </div>
        )}

        <div className=" d-flex mt-4">
          <h5 className="fw-bold ">Total Price</h5>{" "}
          <h5 className="fw-bold ms-auto me-2">
            ${ctx.totalAmount.toFixed(2)}
          </h5>
        </div>
        <div className="text-center">
          {ctx.products.length > 0 ? (
            <Button
              variant="info"
              className="fw-bold mt-3"
            >
              Place Order
            </Button>
          ) : (
            <p className="text-dark pt-5 fw-bolder">Your Cart Is Empty</p>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
