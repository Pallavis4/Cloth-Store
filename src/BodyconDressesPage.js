import React, { useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Bodyconpink from "./assets/bodyconpink.webp";
import gatheredbodycon from "./assets/gatheredbodycon.webp";
import printedbodycon from "./assets/printedbodycon.webp";
import ribbenbodycon from "./assets/ribbenbodycon.webp";

const bodyconProducts = [
  { id: 1, name: "Bodycon Dress", price: 1200, discount: 15, image: Bodyconpink, rating: 4.3, reviews: 25 },
  { id: 2, name: "Gathered Bodycon", price: 1999, discount: 20, image: gatheredbodycon, rating: 4.5, reviews: 40 },
  { id: 3, name: "Printed Bodycon", price: 1399, discount: 18, image: printedbodycon, rating: 4.4, reviews: 30 },
  { id: 4, name: "Ribben Bodycon", price: 1799, discount: 10, image: ribbenbodycon, rating: 4.6, reviews: 35 },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const colors = ["Red", "Black", "Blue", "Pink", "Green"];

function BodyconDressesPage({ cart, setCart }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});

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

  const handleAddToCart = (product) => {
    const size = selectedSize[product.id] || sizes[0];
    const color = selectedColor[product.id] || colors[0];
    const qty = quantity[product.id] || 1;

    const existingIndex = cart.findIndex(
      item =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
    );

    const newItem = { ...product, size, color, quantity: qty };

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const isInCart = (product) => {
    const size = selectedSize[product.id] || sizes[0];
    const color = selectedColor[product.id] || colors[0];
    return cart.some(
      item =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Explore Bodycon Dresses</h2>
      <Row>
        {bodyconProducts.map((product) => {
          const size = selectedSize[product.id] || sizes[0];
          const color = selectedColor[product.id] || colors[0];
          const qty = quantity[product.id] || 1;
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

                <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '350px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}{" "}
                    <span className="text-danger">({product.discount}% OFF)</span><br />
                    <Badge bg="success">{product.rating} ★</Badge>{" "}
                    <span>({product.reviews} Reviews)</span>
                  </Card.Text>

                  {/* Size selection */}
                  <Form.Group className="mb-3">
                    <Form.Label>Size:</Form.Label>
                    <Form.Select
                      value={size}
                      onChange={(e) =>
                        setSelectedSize({ ...selectedSize, [product.id]: e.target.value })
                      }
                    >
                      {sizes.map((s) => (
                        <option key={s} value={s}>Size: {s}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Color options */}
                  <Form.Group className="mb-3">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex">
                      {colors.map((c) => (
                        <div
                          key={c}
                          onClick={() =>
                            setSelectedColor({ ...selectedColor, [product.id]: c })
                          }
                          style={{
                            backgroundColor: c.toLowerCase(),
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            marginRight: "8px",
                            border: color === c ? "2px solid black" : "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Quantity input */}
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) =>
                        setQuantity({ ...quantity, [product.id]: parseInt(e.target.value) || 1 })
                      }
                    />
                  </Form.Group>

                  {/* Buttons */}
                  <div className="d-grid gap-2">
                    <Button
                      variant={inCart ? "secondary" : "primary"}
                      onClick={() => handleAddToCart(product)}
                    >
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

export default BodyconDressesPage;
