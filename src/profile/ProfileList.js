import React from "react";
import "./ProfileList.css";
import { Container, Row } from "react-bootstrap";
import ProfileCard from "./ProfileCard";

export default function ProfileList({ header, list }) {
  return (
    <div>
      <h1 className="profile-list-header">{header}</h1>
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
            ></ProfileCard>
          ))}
        </Row>
      </Container>
    </div>
  );
}
