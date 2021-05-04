import React from "react";

export default function SignGoogle({handleRegisterGoogle}) {
  return (
    <div>
      <div className="google-form">
        <img
          src=".\assets\kisspng-google-logo-google-adwords-google-panda-chrome-5ab6e6606810d0.4998310015219359684263.png"
          alt="goole-icon"
        />
        <button onClick={handleRegisterGoogle}>SignUP with google</button>
      </div>
    </div>
  );
}
