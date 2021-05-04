import axios from "axios";
import React, { useState } from "react";
import SignGoogle from "./SignGoogle"

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault()
    await axios.post("/login",{
      username,
      password
    })
      .then((res) => {
        console.log(res)
        if (res.data.includes("Bonjour")) {
          window.location = "/access";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignInGoogle = () => {
    window.location = "http://localhost:8001/auth/google";
  }

  return (
    <div> 
    <form onSubmit={handleSignIn} >
      <label htmlFor="username">Pseudo</label>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <br />

      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit" >Se connecter</button>
    </form>
    <SignGoogle handleRegisterGoogle={handleSignInGoogle}/>
    </div>
  );
  }
