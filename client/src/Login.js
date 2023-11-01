// src/Login.js
import React from 'react';
import './Login.css';

function Login() {
    
    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="input-container">
                <label>Username</label>
                <input type="text" placeholder="Username" />
            </div>
            <div className="input-container">
                <label>Password</label>
                <input type="password" placeholder="Password" />
            </div>
            <button>Login</button>
        </div>
    );
}

export default Login;
