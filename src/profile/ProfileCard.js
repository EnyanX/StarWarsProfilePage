import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Col } from "react-bootstrap";
import { fetchProfileData } from "./fetchProfileData";
import { fetchProfileDataBatch } from "./fetchProfileDataBatch";
import DetailCard from "./DetailCard";

export default function ProfileCard(props) {
  const [species, setSpecies] = useState("n/a");
  const [films, setFilms] = useState();
  const [vehicles, setVehicles] = useState();

  let info = {};
  const [showDetails, setShowDetails] = useState(false);
  // const [details, setDetails] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false); // flag to avoid duplicate fetching

  // fetch species, films, vehicle information
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

  const handleClick = async () => {
    if (showDetails) {
      // setShowDetails(false); 
    } else {
      if (detailsFetched) {
        // setShowDetails(true);
      } else {
        
        const fetchPromises = [];

        if (props.films) {
          const filmsPromise = fetchProfileDataBatch(
            props.films,
            setFilms,
            "title"
          ).then((filmsData) => {
            info.films = filmsData;
          });
          fetchPromises.push(filmsPromise);
        }

        if (props.vehicles) {
          const vehiclesPromise = fetchProfileDataBatch(
            props.vehicles,
            setVehicles,
            "name"
          ).then((vehiclesData) => {
            info.vehicles = vehiclesData;
          });
          fetchPromises.push(vehiclesPromise);
        }

        // Wait for all fetch operations to complete
        await Promise.all(fetchPromises).then(() => {
          console.log("info: ", info);
          // setShowDetails(true);
          // setDetails(info);
          // setDetailsFetched(true);
        });
      }
    }
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
      {/* {showDetails && <DetailCard info={details}></DetailCard>} */}
    </Col>
  );
}
