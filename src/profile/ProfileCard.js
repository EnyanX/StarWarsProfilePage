import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Col } from "react-bootstrap";

export default function ProfileCard(props) {
  // fetch species information
  const [species, setSpecies] = useState("undefined");

  useEffect(() => {
    const fetchSpeciesData = (url) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("species ", data);
          setSpecies(data.name);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    // fetch all people info from API
    if (props.species) {
      fetchSpeciesData(props.species);
    }
  }, []);

  return (
    <Col>
      <Col md={12} className="profile-card">
        <h3 className="home-greeting">{props.name}</h3>
        {props.gender && props.gender.trim() !== " " && (
          <p>Gender: {props.gender}</p>
        )}
        {props.height && props.height.trim() !== " " && (
          <p>Height: {props.height}</p>
        )}

        {props.weight && props.weight.trim() !== " " && (
          <p>Weight: {props.weight}</p>
        )}
        {props.hair && props.hair.trim() !== " " && (
          <p>Hair Color: {props.hair}</p>
        )}
        {props.birth && props.birth.trim() !== " " && (
          <p>Date of Birth: {props.birth}</p>
        )}

        {/* TODO: fetch species, films, and spaceships information */}

        {props.species && <p>Species: {species}</p>}
        {props.films && <p>Films Appeared: {props.films}</p>}
        {props.vehicles && <p>Vehicles: {props.vehicles}</p>}
      </Col>
    </Col>
  );
}
