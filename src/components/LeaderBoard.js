import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
const LeaderBoard = (userName) => {
    const [leaderboard,setLeaderboard] = useState([]);
    useEffect(()=> {
        const fetchLeaderboard = async () =>{
            try {
                const response = await axios.get("http://localhost:9002/leaderboard");

                 const leaderboardData = response.data;
                setLeaderboard(leaderboardData);
            }
            catch(error)
            {
                console.log("Error Fetching LeaderBoard frontend :", error);
            }
        }
        fetchLeaderboard();
    },[]);
    const isPlayer = (username) => {
        if(username === userName.username){
            return "current-user";
        }
        else {
            return "other-user";
        }
    }
  return (
    <div className="leaderboard">
      <h3 className="leaderboard-title">LeaderBoard</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="leaderboard-header">Rank</th>
            <th className="leaderboard-header">UserName</th>
            <th className="leaderboard-header">WPM</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index} className={isPlayer(player.username)}>
              <td className="leaderboard-data">{index + 1}</td>
              <td className="leaderboard-data">{player.username}</td>
              <td className="leaderboard-data">{player.averageWPM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LeaderBoard;
