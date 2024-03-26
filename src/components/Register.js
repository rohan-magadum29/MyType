import React, { useState } from "react";
import axios from "axios";
const Register = ({ ChangeState }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = () => {
    const { email, password, confirmPassword } = user;
    if (email && password && password === confirmPassword) {
      axios.post("http://localhost:9002/register", user).then(res => alert(res.data.message))
    }
    else if (password !== confirmPassword)
    {
      alert("Password and Confirm Password Do not match")
    }
    else {
        alert("Invalid Input")
    }
  };
  return (
    <div className="Register">
      <h1>Register</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={user.email}
        onChange={handleChange}
      ></input>
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={user.password}
        onChange={handleChange}
      ></input>
      <br />
      <input
        type="password"
        name="confirmPassword"
        value={user.confirmPassword}
        placeholder="Confirm your password"
        onChange={handleChange}
      ></input>
      <br />
      <button onClick={register} className="register-btn">
        Register
      </button>
      <div>Already Registered? Login Here</div>
      <button
        onClick={() => {
          ChangeState("login");
        }}
        className="login-btn"
      >
        Login
      </button>
    </div>
  );
};
export default Register;
