import React,{useState} from "react"
import axios from 'axios'
const Login = ({ChangeState,setLoginUser}) => {
    const [user,setUser] = useState({
        username:"",
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
        try {
            axios.post("http://localhost:9002/login",user).then(res=> {
                alert(res.data.message)
                if(res.status === 200)
                {
                    setLoginUser(res.data.user)
                    ChangeState("home")
                }
            }
        )
        }
        catch(error){
            console.log(error);
        }
        
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
            <p>Not Registered? Register Here</p>
            <button className="register-btn"
            onClick={()=>{
                ChangeState('register')
            }}>Register</button>
        </div>
    )
}
export default Login;