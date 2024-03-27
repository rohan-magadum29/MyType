import React from "react";

const Navbar = ({ ChangeState, user }) => {
  return (
    <div className="navbar">
      {!user ? (
        <button onClick={() => ChangeState("login")}>Login / Register</button>
      ) : (
        <p>Hello {user.email}</p>
      )}
    </div>
  );
};

export default Navbar;
