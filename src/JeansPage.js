import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import skinnyjeans from "./assets/jeans1.png";
import rippedjeans from "./assets/jeans2.png";
import straightfitjeans from "./assets/jeans3.png";
import momjeans from "./assets/jeans5.png";

const jeansProducts = [
  { id: 1, name: "Skinny Jeans", price: 1499, discount: 10, image: skinnyjeans, rating: 4.5, reviews: 42 },
  { id: 2, name: "Ripped Jeans", price: 1699, discount: 15, image: rippedjeans, rating: 4.3, reviews: 35 },
  { id: 3, name: "Straight Fit Jeans", price: 1799, discount: 20, image: straightfitjeans, rating: 4.6, reviews: 48 },
  { id: 4, name: "Mom Jeans", price: 1599, discount: 12, image: momjeans, rating: 4.7, reviews: 51 },
];

const sizes = ["28", "30", "32", "34", "36", "38"];
const colors = ["Black", "Blue", "Dark Blue", "Grey", "White"];

function JeansPage({ cart, setCart }) {
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
      <h2 className="text-center text-primary">Explore Jeans Collection</h2>
      <Row>
        {jeansProducts.map((product) => {
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
                  <Form.Group className="mb-3">
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
                  <Form.Group className="mb-3">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex">
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

export default JeansPage;
