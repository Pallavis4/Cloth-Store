import React, { useState , useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useWishlist } from "./WishlistContext";
import { AuthContext } from "./context/AuthContext";


function MenPage({ cart = [], setCart = () => {} }) {
  const { wishlist = [], addToWishlist, removeFromWishlist } = useWishlist();

  const { user } = useContext(AuthContext);

  const [selectedSizes, setSelectedSizes] = useState({});

  const [quantities, setQuantities] = useState({});
  const [selectedColors, setSelectedColors] = useState({});


  const colorOptions = ["Black", "Blue", "Gray", "White", "Red"];

  const menProducts = [
    {
      id: 101,
      name: "Trendy T-Shirt",
      price: 699,
      discount: 50,
      sizes: ["S", "M", "L"],
      image: "/assets2/men1.png",
    },
    {
      id: 102,
      name: "Casual Shirt",
      price: 899,
      discount: 45,
      sizes: ["M", "L", "XL"],
      image: "/assets2/men2.png",
    },
    {
      id: 103,
      name: "Denim Jackets",
      price: 1199,
      discount: 40,
      sizes: ["S", "M", "L", "XL"],
      image: "/assets2/men3.png",
    },
    {
      id: 104,
      name: "Sportwear Set",
      price: 999,
      discount: 60,
      sizes: ["M", "L"],
      image: "/assets2/men4.png",
    },
    {
      id: 105,
      name: "Formal Shirt",
      price: 1099,
      discount: 50,
      sizes: ["S", "M", "L", "XL"],
      image: "/assets2/men5.png",
    },
    {
      id: 106,
      name: "Floral Shirts",
      price: 599,
      discount: 40,
      sizes: ["L", "XL"],
      image: "/assets2/men6.png",
    },
    {
      id: 107,
      name: "Oversized jeans",
      price: 599,
      discount: 40,
      sizes: ["L", "XL"],
      image: "/assets2/menj3.png",
    },
    {
      id: 108,
      name: "Oversized  ripped jeans",
      price: 599,
      discount: 40,
      sizes: ["L", "XL"],
      image: "/assets2/menj4.png",
    },
  ];

  const toggleWishlist = (product) => {
    if (!user) {
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

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || colorOptions[0];
    const quantity = quantities[product.id] || 1;

    const itemWithOptions = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity,
    };

    const alreadyInCart = cart.some(
      (item) =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (!alreadyInCart) {
      setCart([...cart, itemWithOptions]);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Men's Collection</h2>
      <Row>
        {menProducts.map((product) => {
          const selectedSize = selectedSizes[product.id] || product.sizes[0];
          const selectedColor = selectedColors[product.id] || colorOptions[0];
          const quantity = quantities[product.id] || 1;

          const isInCart = cart.some(
            (item) =>
              item.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
          );

          const isWishlisted = wishlist.some((item) => item.id === product.id);

          return (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="shadow-sm position-relative">
                <div
                  className="wishlist-icon"
                  onClick={() => toggleWishlist(product)}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </div>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "260px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{product.price}
                    <br />
                    <span className="text-danger">{product.discount}% OFF</span>
                  </Card.Text>

                  <Form.Select
                    className="mb-2"
                    onChange={(e) =>
                      handleSizeChange(product.id, e.target.value)
                    }
                    value={selectedSize}
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        Size: {size}
                      </option>
                    ))}
                  </Form.Select>

                  <div className="d-flex mb-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color}
                        onClick={() => handleColorChange(product.id, color)}
                        style={{
                          backgroundColor: color.toLowerCase(),
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          marginRight: 8,
                          border:
                            selectedColor === color
                              ? "2px solid black"
                              : "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      ></div>
                    ))}
                  </div>

                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    className="mb-2"
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />

                  <Button
                    variant={isInCart ? "secondary" : "success"}
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart}
                  >
                    {isInCart ? "In Cart" : "Add to Cart 🛒"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default MenPage;
