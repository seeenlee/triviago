// src/Login.js
import React, {useState} from 'react';
import './Login.css';
import apis from './api.js';

export default function Login({setLoggedUser}) {
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
            <button onClick={event => submit()}>Login</button>
        </div>
    );
}
