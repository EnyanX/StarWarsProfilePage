import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import "./App.css";
import ProfileCard from "./profile/ProfileCard";
import ProfileList from "./profile/ProfileList";
import Spinner from "./spinner/Spinner";
import SearchBar from "./search/SearchBar";

function App() {
  let tmpPeople = [];
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = (url) => {
      console.log(url);
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          tmpPeople = [...tmpPeople, ...data.results];
          console.log("updated: ", people);
          setPeople(tmpPeople);
          
          if (data.next) {
            fetchData(data.next); 
          } else {
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setIsLoading(false);
        });
    };
    
    // fetch all people info from API
    fetchData("https://swapi.dev/api/people");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      {isLoading ? <Spinner /> : <SearchBar className="search" />}
      {!isLoading && <ProfileCard name={"Hunter"}></ProfileCard>}
      {!isLoading && <ProfileList list={people}/>}  
    </div>
  );
}

export default App;
