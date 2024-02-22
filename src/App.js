import React, { useState, useEffect } from "react";
import logo from "./assets/star-wars-logo.svg";
import helmet from "./assets/helmet.svg.png";
import "./App.css";
import ProfileList from "./profile/ProfileList";
import Spinner from "./animation/Spinner";
import SearchBar from "./search/SearchBar";
import Typing from "./animation/Typing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [details, setDetails] = useState();

  // fetch all people information, store to local
  useEffect(() => {
    let tmpPeople = [];
    const fetchData = (url) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          tmpPeople = [...tmpPeople, ...data.results];
          setPeople(tmpPeople);

          if (data.next) {
            fetchData(data.next);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setIsLoading(false);
        });
    };

    // fetch all people info from API
    fetchData("https://swapi.dev/api/people");
  }, []);

  const handleSearchSubmit = (searchInput) => {
    if (searchInput.trim() === "") {
      setSearchPerformed(false);
    } else {
      setSearchPerformed(true);
      // check if any person matched
      const filteredNames = people.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(filteredNames);
      if (filteredNames.length > 0) {
        console.log("valid search");
        setSearchResult(filteredNames);
      } else {
        console.log("invalid search");
        setSearchResult([]);
      }
    }
  };

  const handleDetailCard = (info) => {
    console.log("app info: ", info);
    setDetails(info);
    setDisplayDetail(!displayDetail);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isLoading && (
          <img src={helmet} className="side-logo" alt="side-logo"></img>
        )}
      </header>

      {/* loading animation */}
      {isLoading ? (
        <>
          <Spinner />
          <div className="welcome-message">
            <Typing inputs={["may the force be with you"]}></Typing>
          </div>
        </>
      ) : (
        <SearchBar onSearchSubmit={handleSearchSubmit} className="search" />
      )}

      {/* search functionality */}
      {searchPerformed &&
        (searchResult.length > 0 ? (
          <ProfileList
            header={"Matching Records"}
            list={searchResult}
            handleClick={handleDetailCard}
          />
        ) : (
          <p className="invalid-search-msg">⚠️ No matching records found ⚠️</p>
        ))}

      {!isLoading && (
        <ProfileList
          header={"All Archived Files"}
          list={people}
          handleClick={handleDetailCard}
        />
      )}

      {/* display detail info of selected person */}
      {displayDetail && (
        <div className="detail-container">
          <div className="detail-card">
            {/* details are stored as kv pairs in 'details' object */}
            {Object.entries(details).map(([key, values], index) => (
              <div key={index}>
                <h1 className="detail-key">{key.toUpperCase()}</h1>
                {values.map((value, index) => (
                  <h3 key={index} className="detail-value">
                    {value}
                  </h3>
                ))}
              </div>
            ))}
            <div className="detail-card-close-icon" onClick={handleDetailCard}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
