import React, { useState } from "react";
import axios from "axios";
const Register = ({ ChangeState }) => {
  const [user, setUser] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const {name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = () => {
    const { username,email, password, confirmPassword } = user;
    if (username && email && password && password === confirmPassword) {
      axios.post("http://localhost:9002/register", user).then(res => alert(res.data.message))
      ChangeState("login")
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
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        placeholder="Enter your Username"
        value={user.username}
        onChange={handleChange}
      ></input>
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
      <p>Already Registered? Login Here</p>
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
