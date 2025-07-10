import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import kurti1 from "./assets/kurta1.png";
import kurti2 from "./assets/kurta2.png";
import kurti3 from "./assets/kurta3.png";
import kurti4 from "./assets/kurta4.png";

const kurtiProducts = [
  { id: 1, name: "Anarkali Kurti", price: 999, discount: 10, image: kurti1, rating: 4.4, reviews: 35 },
  { id: 2, name: "Straight Kurti", price: 899, discount: 12, image: kurti2, rating: 4.3, reviews: 28 },
  { id: 3, name: "Printed Kurti", price: 1099, discount: 15, image: kurti3, rating: 4.5, reviews: 40 },
  { id: 4, name: "Flared Kurti", price: 1299, discount: 18, image: kurti4, rating: 4.6, reviews: 45 },
];

const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["Blue", "Green", "Yellow", "White", "Pink"];

function KurtiPage({ cart, setCart }) {
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
      <h2 className="text-center text-primary">Elegant Kurtis Collection</h2>
      <Row>
        {kurtiProducts.map((product) => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          const inCart = isInCart(product);

          return (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow position-relative" style={{ cursor: 'pointer' }}>
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

                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '350px', objectFit: 'cover' }}
                />

                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}{" "}
                    <span className="text-danger">({product.discount}% OFF)</span><br />
                    <Badge bg="success">{product.rating} ★</Badge> <span>({product.reviews} Reviews)</span>
                  </Card.Text>

                  {/* Size Selection */}
                  <Form.Group className="mb-2">
                    <Form.Label>Size:</Form.Label>
                    <div>
                      {sizes.map(size => (
                        <Button
                          key={size}
                          variant={selectedSize[product.id] === size ? "dark" : "light"}
                          onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                          className="me-2 mb-1"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>

                  {/* Color Selection */}
                  <Form.Group className="mb-2">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex flex-wrap">
                      {colors.map(color => (
                        <div
                          key={color}
                          onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            width: '30px',
                            height: '30px',
                            borderRadius: '5px',
                            marginRight: '8px',
                            marginBottom: '5px',
                            border: selectedColor[product.id] === color ? '2px solid black' : '1px solid #ccc',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Quantity */}
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
                      {inCart ? " In Cart" : "Add to Cart"}
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

export default KurtiPage;
