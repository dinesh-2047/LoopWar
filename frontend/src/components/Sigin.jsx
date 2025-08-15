import React, { useState } from "react";
import "./Signin.css"; 
import { px } from "framer-motion";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else {
      if (password.length < 8) newErrors.password = "Minimum 8 characters";
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password))
        newErrors.password = "Password must contain both lowercase and uppercase letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", { username, email, password });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/007/114/318/small_2x/abstract-dark-purple-gradient-background-perfect-for-promotion-presentation-wallpaper-design-etc-vector.jpg')",
        backgroundSize: "cover",   // or "contain"
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",           // full screen height
        width: "100%",
      }}
    >
    <div className="signup-container">
      <div className="signup-form">
        <h1 style={{fontSize: "3rem" ,  background: "linear-gradient(to right, #570962ff, #37092aff)",
        WebkitBackgroundClip: "text",
        fontWeight: "bold",
        WebkitTextFillColor: "transparent",}}>LOOPWAR</h1>
        <p>Already have an account? <span className="signin-link">Sign In</span></p>

        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <ul className="password-rules">
            <li>✔ 8 characters minimum</li>
            <li>✔ Lowercase and uppercase letters</li>
          </ul>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <button className="exit-btn" style={{fontSize: "1rem" ,  background: "linear-gradient(to right, #570962ff, #37092aff)",
        borderRadius: "3rem solid purple",
        WebkitBackgroundClip: "text",
        fontWeight: "bold",
        WebkitTextFillColor: "transparent",}}>Exit</button>
      </div>

      <div className="signup-info">
        {/* <div className="graph-box">
          <p>176.18</p>
          <div className="graph-line"></div>
        </div> */}
        <div className="data-box">
          <div style={{display: "flex"}}>
            <img src="https://www.freeiconspng.com/thumbs/key-png/key-png-11.png" style={{marginLeft: "0px" , width: "4rem" , height: "4rem"}}/>
            <p style={{fontSize: "18px" , marginLeft: "1rem" , fontFamily: "math"}}><strong>Your data, your rules</strong></p>
          </div><br />
          <p>Military-grade encryption to make sure your coaling sessions are private.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
