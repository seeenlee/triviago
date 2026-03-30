import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import apis from "./api";

export default function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validationError = useMemo(() => {
    if (!username.trim()) return "Username is required.";
    if (!password) return "Password is required.";
    if (password.length < 4) return "Password must be at least 4 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  }, [username, password, confirmPassword]);

  const submit = async () => {
    if (validationError) {
      window.alert(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await apis.createUser({ username: username.trim(), password });
      window.alert("Account created. Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      window.alert("Failed to create account. Try a different username.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Create account</h1>

      <div className="input-container">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="input-container">
        <label>Confirm password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <button onClick={submit} disabled={submitting}>
        {submitting ? "Creating..." : "Create account"}
      </button>

      <div style={{ marginTop: 12 }}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

