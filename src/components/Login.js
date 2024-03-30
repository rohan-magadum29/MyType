import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ ChangeState, setLoginUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:9002/login", user);
      if (res.status === 200) {
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
            setLoginUser(res.data.user);
            ChangeState("home");
          },
        });
      } 
    } catch (error) {
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
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your Email"
        name="email"
        value={user.email}
        onChange={handleChange}
      ></input>
      <br />
      <input
        type="password"
        placeholder="Enter your password"
        name="password"
        value={user.password}
        onChange={handleChange}
      ></input>
      <br />
      <button className="login-btn" onClick={login}>
        Login
      </button>
      <ToastContainer />
      <p>Not Registered? Register Here</p>
      <button
        className="register-btn"
        onClick={() => {
          ChangeState("register");
        }}
      >
        Register
      </button>
    </div>
  );
};
export default Login;
