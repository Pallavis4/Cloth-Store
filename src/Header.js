import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsCart, BsHeart } from "react-icons/bs";
import { useWishlist } from "./WishlistContext";

function Header({ cart = [] }) { // Only keep cart from props
  const { wishlist } = useWishlist(); // Get wishlist from context
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="custom-navbar" style={{ backgroundColor: "#F8F9FA" }}>
      <Container>
        {/* Brand Name with Color */}
        <Navbar.Brand href="#" className="brand" style={{ color: "#007bff", fontWeight: "bold", fontSize: "24px" }}>Clothing Store</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarText" className="custom-toggler" />
        <Navbar.Collapse id="navbarText">

          {/* Navigation Links with Colors */}
          <Nav className="ms-3">
            <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
            <Nav.Link as={Link} to="/men" className="text-primary">Men</Nav.Link>
            <Nav.Link as={Link} to="/women" className="text-success">Women</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-info">About</Nav.Link>
           {/*<Nav.Link as={Link} to="/wishlist" className="text-danger">Wishlist ({wishlist.length})</Nav.Link>*/}
          </Nav>

          {/* Buttons Section */}
          <Nav className="ms-auto">
            <Button className="me-3" style={{ backgroundColor: "#6610f2", border: "none" }} onClick={() => navigate('/signup')}>Sign-Up</Button>
            <Button className="me-3" style={{ backgroundColor: "#dc3545", border: "none" }} onClick={() => navigate('/login')}>Login</Button>

            {/* Wishlist with Heart Icon and Color */}
            <Button as={Link} to="/wishlist" className="me-3" style={{ backgroundColor: "#e83e8c", border: "none" }}>
              <BsHeart size={20} />
              {wishlist?.length > 0 && <span className="wishlist-count ms-1">{wishlist.length}</span>}
            </Button>

            {/* Cart with Cart Icon and Color */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="cart-btn" style={{ color: "#ffc107" }}>
                <BsCart size={25} />
                {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
              </Dropdown.Toggle>

              <Dropdown.Menu className="cart-dropdown">
                {cart?.length === 0 ? (
                  <Dropdown.Item>No items in cart</Dropdown.Item>
                ) : (
                  cart.map((item, index) => (
                    <Dropdown.Item key={index}>
                      {item.name} - ₹{item.price}
                    </Dropdown.Item>
                  ))
                )}
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/cart">Go To Cart</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
