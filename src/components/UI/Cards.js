import ProdContext from "../../store/prodContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";

const Cards = (props) => {
  const ctx = useContext(ProdContext);
  const onClickHandler = () => {
    ctx.addToCart({
      title: props.title,
      price: props.price,
      quantity: props.quantity,
      id: props.id,
    });
  };

  return (
    <Col md="4"  className="mb-4">
      <Card className="mx-auto h-100 border-0 shadow-sm" style={{ maxWidth: "25rem" }}>
        <Link to={`/products/${props.id}`}>
          <Card.Img variant="top" src={props.image} />
        </Link>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title.
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="fw-bold m-0">{props.title}</Card.Title>
            <div>
              <span className="fw-bold fs-6 border py-1 px-2 rounded border-0 text-light bg-danger">${props.price}</span>
            </div>
          </div>

          <Button
            onClick={onClickHandler}
            variant="info"
            size="sm"
            className="px-3 fw-bold mt-1 border-0"
          >
            Add to Cart{" "}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Cards;
