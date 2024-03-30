import React, { useEffect, useState } from "react";
import axios from "axios";

const WPMDisplay = ({ userEmail ,currentstate}) => {
  const [games, setGames] = useState([]);
  const [average,setAverage] = useState();
  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:9002/games", {
        params: { email: userEmail },
      });
      setGames(response.data);
      console.log(games);
    } catch (error) {
      console.error("Error Fetching Games", error);
    }
  };
  useEffect(()=>{
    fetchGames();
  },[userEmail]);
  useEffect(()=>{
    let totalSpeed = 0;
    games.map((game, index) => {
      totalSpeed += game.speed;
    });
    setAverage(parseInt(totalSpeed/games.length));
    //const average = totalSpeed / games.length;
  },[games]);
  return (
    <div>
        <p className="WPM">
          {     
              average + " WPM  Average"
          }
        </p>
    </div>
  );
};
export default WPMDisplay;
