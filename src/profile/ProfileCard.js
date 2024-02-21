import "./ProfileCard.css";
import { Col } from "react-bootstrap";

export default function ProfileCard(props) {
  return (
    <Col >
      <Col md={12} className="profile-card">
        <h3 className="home-greeting">{props.name}</h3>
        <p>Height: {props.height}</p>
        <p>Weight: {props.weight}</p>
        <p>Hair Color: {props.hair}</p>
        <p>Date of Birth: {props.birth}</p>
        <p>Species: {props.species}</p>
      </Col>
    </Col>
  );
}
