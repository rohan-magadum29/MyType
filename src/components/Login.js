import React,{useState} from "react"
import axios from 'axios'
const Login = ({ChangeState,setLoginUser}) => {
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
        
    }
    const login = () => {
        axios.post("http://localhost:9002/login",user).then(res=> {
                alert(res.data.message)
                setLoginUser(res.data.user)
                ChangeState("home")
            }
        )
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="email" placeholder="Enter your Email" name="email" value={user.email} onChange={handleChange}>
            </input><br/>
            <input type="password" placeholder="Enter your password" name="password" value={user.password} onChange={handleChange}>
            </input>
            <br/>
            <button className="login-btn" onClick={login}>Login</button>
            <div>Not Registered? Registere Here</div>
            <button className="register-btn"
            onClick={()=>{
                ChangeState('register')
            }}>Register</button>
        </div>
    )
}
export default Login;