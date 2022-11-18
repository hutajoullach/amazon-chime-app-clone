import { useRef } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:5000/messages/signup", user);
        navigate("/login")
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Amazon Chime</h3>
          <span className="loginDesc">To create a new account, enter the email address you use for scheduling meetings.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              className="loginInput"
              minLength="6"
              required
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              type="password"
              className="loginInput"
              minLength="6"
              required
            />
            <button className="loginButton" type="submit">Signup</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
