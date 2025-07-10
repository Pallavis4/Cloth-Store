import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Sample images (replace with your actual paths)
import gym1 from "./assets/gym1.png";
import gym2 from "./assets/gym2.png";
import gym3 from "./assets/gym3.png";
import gym4 from "./assets/gym4.png";

const gymProducts = [
  { id: 1, name: "Gym Set 1", price: 999, discount: 15, image: gym1, rating: 4.4, reviews: 20 },
  { id: 2, name: "Gym Top 2", price: 899, discount: 10, image: gym2, rating: 4.2, reviews: 15 },
  { id: 3, name: "Yoga Leggings", price: 1299, discount: 20, image: gym3, rating: 4.7, reviews: 30 },
  { id: 4, name: "Sports Bra", price: 799, discount: 12, image: gym4, rating: 4.5, reviews: 18 },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "Gray", "Pink", "Blue", "White"];

function GymPage({ cart, setCart }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});

  const isInCart = (product) => {
    return cart?.some(item =>
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
      <h2 className="text-center text-primary">Shop Activewear for Women</h2>
      <Row>
        {gymProducts.map((product) => {
          const isWishlisted = wishlist?.some(item => item.id === product.id);
          const inCart = isInCart(product);

          return (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="shadow position-relative">
                <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: "350px", objectFit: "cover" }} />

                {/* Heart icon */}
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

                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}{" "}
                    <span className="text-danger">({product.discount}% OFF)</span><br />
                    <Badge bg="success">{product.rating} ★</Badge> <span>({product.reviews} Reviews)</span>
                  </Card.Text>

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

                  <Form.Group className="mb-2">
                    <Form.Label>Color:</Form.Label>
                    <div className="d-flex flex-wrap">
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
                            marginBottom: "5px",
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
                      {inCart ? "Update in Cart" : "Add to Cart"}
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

export default GymPage;
