// src/Login.js
import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import apis from './api.js';

export default function Login({setLoggedUser}) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const submit = async () => {
        const payload = {
            username: userName,
            password: password
        }
        apis.login(payload)
        .then(res => {
            if (res.data >= 0) {
                sessionStorage.setItem('username', userName);
                setLoggedUser(res.data)
                navigate("/");
            }
            else {
                window.alert("Username or Password is incorrect")
            }
        })
        .catch(error => console.error(error));
    }
    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="input-container">
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <button onClick={() => submit()}>Login</button>
            <div style={{ marginTop: 12 }}>
                <Link to="/create-user">Create an account</Link>
            </div>
        </div>
    );
}
