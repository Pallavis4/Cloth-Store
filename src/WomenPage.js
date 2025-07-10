import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Custom styles for hover effects

// Image imports
import Bodycon_dress from "./assets/Bodycon_dress.webp";
import tiedhaltercorset from "./assets/tiedhaltercorset.webp";
import Kurti from "./assets/Kurtis.webp";
import Saree from "./assets/Saree.webp";
import Off_Shoulder from "./assets/Off_Shoulder.webp";
import jeans from "./assets/jeans.webp";
import pants from "./assets/pants.webp";
import gymwear from "./assets/gymwear.webp";

const womenProducts = [
  { id: 4, name: "Bodycon Dress", image: Bodycon_dress },
  { id: 5, name: "Corset", image: tiedhaltercorset },
  { id: 6, name: "Kurti", image: Kurti },
  { id: 7, name: "Saree", image: Saree },
  { id: 8, name: "Off-Shoulder Top", image: Off_Shoulder },
  { id: 9, name: "Jeans", image: jeans },
  { id: 10, name: "Pants", image: pants },
  { id: 11, name: "Gymwear", image: gymwear },
];

function WomenPage({ cart, setCart }) {
  const navigate = useNavigate();

  const openPage = (product) => {
    const categoryRoutes = {
      "Bodycon Dress": "/bodycon-dresses",
      "Corset": "/corset",
      "Kurti": "/kurti",
      "Saree": "/saree",
      "Off-Shoulder Top": "/off-shoulder-tops",
      "Jeans": "/jeans",
      "Pants": "/pants",
      "Gymwear": "/gymwear",
    };

    const route = categoryRoutes[product.name];
    if (route) navigate(route);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Trending Now in Women's Fashion</h2>
      <Row>
        {womenProducts.map((product) => (
          <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
            <Card className="shadow product-card" onClick={() => openPage(product)} style={{ cursor: "pointer" }}>
              <div className="card-img-wrapper">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold">{product.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WomenPage;
