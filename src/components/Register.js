import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const register = async () => {
    const { username,email, password, confirmPassword } = user;
    if (username && email && password && password === confirmPassword) {
      try {
        const res = await axios.post("http://localhost:9002/register", user)
        if(res.status === 201)
        {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            onClose: () => {
              ChangeState("login")
            },
          });
        }
      }
      catch(error)
      {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
      
    }
    else if (password !== confirmPassword)
    {
      toast.error("Password Do not match", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    else {
      toast.error("Please Enter All Fields", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
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
      <ToastContainer />
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
