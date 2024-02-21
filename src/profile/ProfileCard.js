import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Col } from "react-bootstrap";
import { fetchProfileData } from "./fetchProfileData";
import { fetchProfileDataBatch } from "./fetchProfileDataBatch";

export default function ProfileCard(props) {
  const [species, setSpecies] = useState("n/a");
  const [films, setFilms] = useState();
  const [vehicles, setVehicles] = useState();

  // fetch species, films, vehicle information
  useEffect(() => {
    const fetchProfileDataAsync = async () => {
      try {
        if (props.species) {
          fetchProfileData(props.species, setSpecies, "name");
        }
        if (props.films) {
          fetchProfileDataBatch(props.films, setFilms, "title");
        }
        if (props.vehicles) {
          fetchProfileDataBatch(props.vehicles, setVehicles, "name");
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    fetchProfileDataAsync();
  }, [props.species, props.films, props.vehicles]);

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
        {props.species && <p>Species: {species}</p>}
        {/* {props.films && <p>Films Appeared: {films}</p>}
        {props.vehicles && <p>Vehicles: {vehicles}</p>} */}
      </Col>
    </Col>
  );
}
