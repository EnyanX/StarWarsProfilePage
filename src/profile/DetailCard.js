import React from "react";
import "./DetailCard.css";
import { Container, Row, Col } from "react-bootstrap";

export default function DetailCard({ info }) {
  return (
    <Container className="detail-container">
      hellofsdgfhgkjgl
      {/* <Row className="detail-row">
        <Col md={3}></Col>
        <Col md={7}>
          <div className="details">
            {Object.entries(info).map(([key, value], index) => (
              <div key={index}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </Col>
      </Row> */}
    </Container>
  );
}
