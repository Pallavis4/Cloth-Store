import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import offshoulder1 from "./assets/offs1.png";
import offshoulder2 from "./assets/offs2.png";
import offshoulder3 from "./assets/offs3.png";
import offshoulder4 from "./assets/offs4.png";

const offShoulderProducts = [
  { id: 1, name: "Chic Off-Shoulder", price: 1099, discount: 10, image: offshoulder1, rating: 4.4, reviews: 26 },
  { id: 2, name: "Boho Off-Shoulder", price: 1299, discount: 15, image: offshoulder2, rating: 4.6, reviews: 34 },
  { id: 3, name: "Casual Off-Shoulder", price: 999, discount: 8, image: offshoulder3, rating: 4.3, reviews: 18 },
  { id: 4, name: "Party Off-Shoulder", price: 1499, discount: 20, image: offshoulder4, rating: 4.7, reviews: 42 },
];

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["Black", "White", "Red", "Blue", "Yellow"];

function OffShoulderTopPage({ cart, setCart }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});

  const isInCart = (product) => {
    return cart.some(item =>
      item.id === product.id &&
      item.size === (selectedSize[product.id] || sizes[0]) &&
      item.color === (selectedColor[product.id] || colors[0])
    );
  };

  const handleAddToCart = (product) => {
    const selectedProduct = {
      ...product,
      size: selectedSize[product.id] || sizes[0],
      color: selectedColor[product.id] || colors[0],
      quantity: quantity[product.id] || 1,
    };

    setCart((prevCart) => {
      const index = prevCart.findIndex(item =>
        item.id === selectedProduct.id &&
        item.size === selectedProduct.size &&
        item.color === selectedProduct.color
      );

      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity += selectedProduct.quantity;
        return updatedCart;
      } else {
        return [...prevCart, selectedProduct];
      }
    });
  };

  const handleToggleWishlist = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please log in or sign up to use the wishlist feature.");
    return;
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);
  if (isWishlisted) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Trendy Off-Shoulder Tops</h2>
      <Row>
        {offShoulderProducts.map((product) => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          const inCart = isInCart(product);

          return (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow position-relative">
                <div
                  onClick={() => handleToggleWishlist(product)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "1.5rem",
                    color: isWishlisted ? "red" : "white",
                    cursor: "pointer",
                    textShadow: "0 0 5px rgba(0,0,0,0.6)",
                    zIndex: 1,
                  }}
                >
                  {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </div>

                <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: "350px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}{" "}
                    <span className="text-danger">({product.discount}% OFF)</span><br />
                    <Badge bg="success">{product.rating} ★</Badge> <span>({product.reviews} Reviews)</span>
                  </Card.Text>

                  <Form.Group className="mb-2">
                    <Form.Label>Size:</Form.Label>
                    <Form.Select
                      value={selectedSize[product.id] || ""}
                      onChange={(e) => setSelectedSize({ ...selectedSize, [product.id]: e.target.value })}
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex">
                      {colors.map((color) => (
                        <div
                          key={color}
                          onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            marginRight: "8px",
                            border: selectedColor[product.id] === color ? "2px solid black" : "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity[product.id] || 1}
                      onChange={(e) => setQuantity({ ...quantity, [product.id]: parseInt(e.target.value) })}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant={inCart ? "secondary" : "primary"} onClick={() => handleAddToCart(product)}>
                      {inCart ? "In Cart" : "Add to Cart"}
                    </Button>
                    <Button variant="success">Buy Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default OffShoulderTopPage;
