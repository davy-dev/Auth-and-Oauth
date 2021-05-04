import React, { useState } from "react";
import axios from "axios";
import SignGoogle from "./SignGoogle";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios
      .post("/register", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.includes("Bonjour")) {
          window.location = "/access";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegisterGoogle = () => {
    window.location = "http://localhost:8001/auth/google";
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Pseudo</label>
        <input
          type="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">S'incrire</button>
      </form>

      <SignGoogle handleRegisterGoogle={handleRegisterGoogle} />
    </div>
  );
}
