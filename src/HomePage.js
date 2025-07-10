import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mensImage from "./assets/men2.png";
import womensImage from "./assets/Off_Shoulder.webp";

const categories = [
  {
    label: "Men's Clothing",
    image: mensImage,
    route: "/men",
  },
  {
    label: "Women's Clothing",
    image: womensImage,
    route: "/women",
  },
];
function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="mt-4 homepage-categories">
      <h2 className="text-center text-primary mb-4">Clothing Store</h2>
      <p className="text-center mb-5">
        <strong>Choose a category to start shopping</strong>
      </p>
      <Row className="justify-content-center">
        {categories.map((cat, idx) => (
          <Col
            key={idx}
            xs={10}
            sm={6}
            md={4}
            lg={3}
            className="text-center category-card"
            onClick={() => navigate(cat.route)}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="category-img mb-3"
            />
            <h5 className="category-label">{cat.label}</h5>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
