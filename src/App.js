import React, { useState, useEffect } from "react";
import logo from "./assets/star-wars-logo.svg";
import "./App.css";
import ProfileCard from "./profile/ProfileCard";
import ProfileList from "./profile/ProfileList";
import Spinner from "./animation/Spinner";
import SearchBar from "./search/SearchBar";
import Typing from "./animation/Typing";

function App() {
  let tmpPeople = [];
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = (url) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          tmpPeople = [...tmpPeople, ...data.results];
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

      {isLoading ? <Spinner /> : <SearchBar list={people} className="search" />}
      {/* {!isLoading && <ProfileCard name={"Hunter"}></ProfileCard>} */}
      
      {!isLoading && <ProfileList header={"All Archived Files"} list={people}/>}  
      <Typing inputs={["may the force be with you"]}></Typing>
    </div>
  );
}

export default App;
