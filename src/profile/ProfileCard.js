import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Col } from "react-bootstrap";
import { fetchProfileData } from "./fetchProfileData";
import { fetchProfileDataBatch } from "./fetchProfileDataBatch";

// ProfileCard contains a person's basic info
export default function ProfileCard(props) {
  const [species, setSpecies] = useState("n/a");
  const [, setFilms] = useState();
  const [, setVehicles] = useState();

  let info = {};

  // fetch species information (films/vehicles info is fetched when ProfileCard is onclick)
  useEffect(() => {
    const fetchProfileDataAsync = async () => {
      try {
        if (props.species) {
          fetchProfileData(props.species, setSpecies, "name");
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    fetchProfileDataAsync();
  }, [props.species]);

  // fetch films and vehicles info when ProfileCard onclick
  // info stored as key-valueArray pairs into 'info' object
  const handleClick = async () => {
    const fetchPromises = [];

    if(props.name) {
      info.name = [];
      info.name.push(props.name);
    }

    if (props.films) {
      info.films = [];
      const filmsPromise = fetchProfileDataBatch(
        props.films,
        setFilms,
        "title"
      ).then((filmsData) => {
        info.films.push(...filmsData);
      });
      fetchPromises.push(filmsPromise);
    }
    if (props.vehicles) {
      info.starships = [];
      const vehiclesPromise = fetchProfileDataBatch(
        props.vehicles,
        setVehicles,
        "name"
      ).then((vehiclesData) => {
        info.starships.push(...vehiclesData);
      });
      fetchPromises.push(vehiclesPromise);
    }

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises).then(() => {
      // console.log("info: ", info);
      props.handleClick(info);
    });
  };

  return (
    <Col>
      <Col md={12} className="profile-card" onClick={handleClick}>
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
      </Col>
    </Col>
  );
}
