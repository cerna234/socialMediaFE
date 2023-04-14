import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../../styles/Login.css"
import NavBar from "../NavBar/Navbar"
import * as constants from "../../Constants"

export default function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [login, setLogin] = useState(false);
const cookies = new Cookies();

const handleSubmit = (e) => {
    const configuration = {
        method: "post",
        url: `${constants.BASE_URL}/user/login`,
        data: {
          email,
          password,
        },
      };


      axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
            path: "/",
          });


        setLogin(true);
        window.location.href = "/profile";
      })
      .catch((error) => {
        error = new Error();
      });
    e.preventDefault();

  }
    return (
        <div className="LoginPage">
            
            <div className="splashPageSection">
             <div className="SplashinnerContainer">
                <p className="loginSplashTitle">Welcome back!</p>
                <p className="loginSplashSubtext">Sign in to access your account.</p>
             </div>
            </div>
            <div className="formSection">
            <Form className="form" onSubmit={(e)=>handleSubmit(e)}>


              <h2 className="formTitle">SIGN IN</h2>
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
            
              <p className="formQuestion">Dont have an account? <a href="/register">Register</a></p>

             
            </Form>

            </div>
            
        </div>
    )
}
