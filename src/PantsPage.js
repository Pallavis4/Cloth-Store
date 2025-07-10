import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import flaredpants from "./assets/pant1.png";
import widelegpants from "./assets/pant2.png";
import highwaistpants from "./assets/pant3.png";
import printedpants from "./assets/pant4.png";

const pantsProducts = [
  { id: 1, name: "Flared Pants", price:777, discount: 15, image: flaredpants, rating: 4.4, reviews: 33 },
  { id: 2, name: "Wide Leg Pants", price: 1200, discount: 20, image: widelegpants, rating: 4.6, reviews: 41 },
  { id: 3, name: "High Waist Pants", price: 999, discount: 10, image: highwaistpants, rating: 4.5, reviews: 28 },
  { id: 4, name: "Printed Pants", price: 1299, discount: 18, image: printedpants, rating: 4.2, reviews: 25 },
];

const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["Black", "Beige", "Navy", "Olive", "White"];

function PantsPage({ cart, setCart }) {
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
      quantity: quantity[product.id] || 1
    };

    setCart(prevCart => {
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
      <h2 className="text-center text-primary">Explore Trendy Pants</h2>
      <Row>
        {pantsProducts.map((product) => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          const inCart = isInCart(product);

          return (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow position-relative">
                {/* Heart Icon */}
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
                    zIndex: 1
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
                    <Badge bg="success">{product.rating} ★</Badge>{" "}
                    <span>({product.reviews} Reviews)</span>
                  </Card.Text>

                  {/* Size Selection */}
                  <Form.Group className="mb-2">
                    <Form.Label>Size:</Form.Label>
                    <Form.Select
                      value={selectedSize[product.id] || ""}
                      onChange={(e) =>
                        setSelectedSize({ ...selectedSize, [product.id]: e.target.value })
                      }
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Color Selection */}
                  <Form.Group className="mb-2">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex flex-wrap">
                      {colors.map((color) => (
                        <div
                          key={color}
                          onClick={() =>
                            setSelectedColor({ ...selectedColor, [product.id]: color })
                          }
                          style={{
                            backgroundColor: color.toLowerCase().replace(/\s/g, ''),
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            marginRight: "8px",
                            marginBottom: "5px",
                            border: selectedColor[product.id] === color
                              ? "2px solid black"
                              : "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Quantity Input */}
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity[product.id] || 1}
                      onChange={(e) =>
                        setQuantity({ ...quantity, [product.id]: parseInt(e.target.value) })
                      }
                    />
                  </Form.Group>

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

export default PantsPage;
