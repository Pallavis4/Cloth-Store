import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "./context/AuthContext";

// Add your image imports here
import blackBodycon from "./assets/bodyconpink.webp";
import redBodycon from "./assets/lace trimbody.webp";
import greenBodycon from "./assets/asymentricbodycon.webp";
import whiteBodycon from "./assets/gatheredbodycon.webp";

const bodyconProducts = [
  { id: 11, name: "Elegant Black Bodycon", price: 1899, discount: 15, image: blackBodycon, rating: 4.8, reviews: 40 },
  { id: 12, name: "Romantic Red Bodycon", price: 1799, discount: 10, image: redBodycon, rating: 4.6, reviews: 28 },
  { id: 13, name: "Fresh Green Bodycon", price: 1599, discount: 20, image: greenBodycon, rating: 4.5, reviews: 34 },
  { id: 14, name: "Chic White Bodycon", price: 1999, discount: 18, image: whiteBodycon, rating: 4.7, reviews: 50 },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const pastelColors = ["Light Pink", "Powder Blue", "Off White", "Lavender", "Peach", "Red", "Olive"];

function BodyconDressesPage({ cart, setCart }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useContext(AuthContext);

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});

  const handleToggleWishlist = (product) => {
    if (!user) {
      alert("Please log in to add to wishlist.");
      return;
    }

    const isWishlisted = wishlist.some(item => item.id === product.id);
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToCart = (product) => {
    const size = selectedSize[product.id] || sizes[0];
    const color = selectedColor[product.id] || pastelColors[0];
    const qty = quantity[product.id] || 1;

    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === size && item.color === color
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
    const color = selectedColor[product.id] || pastelColors[0];
    return cart.some(
      item => item.id === product.id && item.size === size && item.color === color
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-danger">Elegant Bodycon Dresses</h2>
      <Row>
        {bodyconProducts.map((product) => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          const inCart = isInCart(product);

          return (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow position-relative" style={{ cursor: 'pointer' }}>
                {/* Wishlist Icon */}
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
                    <Badge bg="success">{product.rating} ★</Badge>{" "}
                    <span>({product.reviews} Reviews)</span>
                  </Card.Text>

                  {/* Size */}
                  <Form.Group className="mb-2">
                    <Form.Label>Size:</Form.Label>
                    <div>
                      {sizes.map((size) => (
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

                  {/* Color */}
                  <Form.Group className="mb-2">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex flex-wrap">
                      {pastelColors.map((color) => (
                        <div
                          key={color}
                          onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                          style={{
                            backgroundColor: color.toLowerCase().replace(/\s/g, ''),
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
