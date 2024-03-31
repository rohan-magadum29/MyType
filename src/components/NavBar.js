import React from "react";

const Navbar = ({ ChangeState,setLoginUser, user }) => {
  return (
    <div className="navbar">
      
      {!user ? (
        <button onClick={() => ChangeState("login")}>Login / Register</button>
      ) : (
        <div className="greeting">
          
          <button onClick={()=> ChangeState("home")}>Home</button>
          <button onClick={()=> ChangeState("leaderboard")}>View LeaderBoard</button>
          <p>Hello {user.username}</p>
          <button onClick={()=> {ChangeState("login"); setLoginUser(null)}}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
