// LogIn.js
import React, { useState } from "react";
import "./styles.css";

const LogIn = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Sending login request..."); // Debugging
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login response:", data); // Debugging
        if (data.user_id) {
          console.log("Successful login"); // Debugging
          onLogin(data.user_id); // Call the prop function to update parent state
        } else {
          console.log("Failed login"); // Debugging
        }
      } else {
        console.error("Login error:", response.statusText); // Debugging
        // Handle error
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging
      // Handle error
    }
  };

  return (
    <div className="login-form">
      {/* Login Form */}
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LogIn;

