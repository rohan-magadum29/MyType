import React from "react";

const Navbar = ({ ChangeState,setLoginUser, user }) => {
  return (
    <div className="navbar">
      {!user ? (
        <button onClick={() => ChangeState("login")}>Login / Register</button>
      ) : (
        <div className="greeting">
          <p>Hello {user.username}</p>
          <div>
          <button onClick={()=> ChangeState("home")}>Home</button>
          <button onClick={()=> ChangeState("leaderboard")}>View LeaderBoard</button>
          <button onClick={()=> {ChangeState("login"); setLoginUser(null)}}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
