import { Row, Col, Button } from "react-bootstrap";
import ProdContext from "../../store/prodContext";
import { useContext } from "react";
const CartItems = (props) => {
  const ctx = useContext(ProdContext);
  const onDecrementHandler = () => {
    ctx.removeFromCart(props.id);
  };

  const onIncrementHandler = () => {
    ctx.addToCart({
      ...props,
      quantity: 1,
    });
  };
  return (
    <Row className="mb-3 overflow-auto align-items-center">
      <Col>
        <span className="fw-bold text-danger">{props.title}</span>
      </Col>
      <Col>
        <span className="fw-bold text-dark">${props.price}</span>
      </Col>
      <Col className="d-flex">
        <Button
          size="sm"
          variant="outline-success"
          onClick={onIncrementHandler}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
        <span className="fw-bold mx-auto">{props.quantity}</span>
        <Button
          className=""
          variant="outline-danger"
          size="sm"
          onClick={onDecrementHandler}
        >
          <i className="bi bi-dash-lg fw-bold"></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItems;
