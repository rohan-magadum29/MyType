import React from "react";

const Navbar = ({ ChangeState, user }) => {
  return (
    <div className="navbar">
      {!user ? (
        <button onClick={() => ChangeState("login")}>Login / Register</button>
      ) : (
        <div className="greeting">
          <p>Hello {user.username}</p>
          <button onClick={()=> ChangeState("login")}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
