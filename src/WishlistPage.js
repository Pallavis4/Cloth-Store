import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";



function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}{" "}
                    <span className="text-danger">({product.discount}% OFF)</span>
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove from Wishlist
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WishlistPage;
