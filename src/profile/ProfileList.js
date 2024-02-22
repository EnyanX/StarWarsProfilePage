import React from "react";
import "./ProfileList.css";
import { Container, Row } from "react-bootstrap";
import ProfileCard from "./ProfileCard";

export default function ProfileList({ header, list, handleClick }) {
  return (
    <div>
      <h1 className="profile-list-header">{header}</h1>
      <p className="profile-list-msg"> click for more info✨</p>
      <Container className="profile-list-content">
        <Row>
          {list.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              gender={profile.gender}
              height={profile.height}
              weight={profile.mass}
              hair={profile.hair_color}
              species={profile.species}
              films={profile.films}
              vehicles={profile.vehicles}
              className="profile-list-card"
              handleClick={handleClick}
            ></ProfileCard>
          ))}
        </Row>
      </Container>
    </div>
  );
}
