import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsCart, BsHeart } from "react-icons/bs";
import { useWishlist } from "./WishlistContext";
import { AuthContext } from "./context/AuthContext";

function Header({ cart = [] }) {
  const { wishlist } = useWishlist();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar" style={{ backgroundColor: "#F8F9FA" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand" style={{ color: "#007bff", fontWeight: "bold", fontSize: "24px" }}>
          Clothing Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarText" />
        <Navbar.Collapse id="navbarText">
          <Nav className="ms-3">
            <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
            <Nav.Link as={Link} to="/men" className="text-primary">Men</Nav.Link>
            <Nav.Link as={Link} to="/women" className="text-success">Women</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-info">About</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center">
            {/* ✅ Show only if user is logged in */}
            {user ? (
              <>
                <Button variant="outline-secondary" className="me-3" disabled>
                  Hi, {user.name.split(" ")[0]}
                </Button>
                <Button className="me-3" style={{ backgroundColor: "#6c757d", border: "none" }} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="me-3" style={{ backgroundColor: "#6610f2", border: "none" }} onClick={() => navigate('/signup')}>
                  Sign-Up
                </Button>
                <Button className="me-3" style={{ backgroundColor: "#dc3545", border: "none" }} onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}

            <Button as={Link} to="/wishlist" className="me-3" style={{ backgroundColor: "#e83e8c", border: "none" }}>
              <BsHeart size={20} />
              {wishlist?.length > 0 && <span className="wishlist-count ms-1">{wishlist.length}</span>}
            </Button>

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
