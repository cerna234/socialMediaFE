

import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "../../styles/Login.css"

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3005/register",
            data: {
              email,
              password,
            },
          };
          axios(configuration)
          .then((result) => {
            setRegister(true);
            window.location.href = "/";
          })
          .catch((error) => {
            error = new Error();
          });
        e.preventDefault();
       
      }
  
    return (
      <div className="LoginPage">

      <div className="splashPageSection">
       <div className="innerContainer">
          <p className="loginSplashTitle">Welcome back!</p>
          <p className="loginSplashSubtext">Sign in to access your account.</p>
       </div>
      </div>
      <div className="formSection">
      <Form className="form" onSubmit={(e)=>handleSubmit(e)}>


        <h2 className="formTitle">Register</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="formInput"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="formInput"
        />
  


        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="formButton"
        >
        Login
        </Button>
      
        <p className="formQuestion">Dont have an account? <a href="/">Login</a></p>

       
      </Form>

      </div>
      
  </div>
    )
}
