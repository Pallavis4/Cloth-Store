import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function AboutPage() {
  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">About Us</h2>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
              <p>
                <strong>Welcome to our fashion world!</strong> We are an online clothing store dedicated to bringing you the latest trends in women’s and men’s fashion. Whether you're looking for stylish dresses, everyday essentials, or trendy ethnic wear — we've got you covered.
              </p>

              <p>
                Our mission is simple: to make fashion accessible, affordable, and inclusive for everyone. We believe that your style is a reflection of your identity, and our collection is designed to empower confidence and self-expression through clothing.
              </p>

              <p>
                <strong>Why choose us?</strong>
              </p>
              <ul>
                <li>🛍️ Curated collections updated with the latest fashion</li>
                <li>🎨 Wide range of sizes and color options for every body</li>
                <li>🚚 Fast delivery & easy returns</li>
                <li>❤️ Wishlist & Cart features for a smooth shopping experience</li>
              </ul>

              <p>
                We're more than just an online store — we're a fashion-forward community. Stay connected with us on social media, and don't forget to tag us in your looks. We love seeing how you style our pieces!
              </p>

              <p className="text-muted">
                Thank you for shopping with us. We look forward to being a part of your fashion journey!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
