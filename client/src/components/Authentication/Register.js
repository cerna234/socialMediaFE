

import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "../../styles/Login.css"
import * as constants from "../../Constants"

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [register, setRegister] = useState(false);
    const [error, setError] = useState(false)


    
    const handleSubmit = (e) => {
        

        const configuration = {
            method: "post",
            url: `${constants.BASE_URL}/user/register`,
            data: {
              email,
              password,
              birthday
            },
          };

          
          password.length && email.length > 4 ? 
          axios(configuration)
          .then((result) => {
            setRegister(true);

            window.location.href = "/";
          })
          .catch((error) => {
            setError(true)
            error = new Error();
          })
          
          :

          setError(true);
          
        e.preventDefault();
        
       
      }
  
    return (
      <div className="LoginPage">

      <div style={{backgroundImage:`url("https://images.unsplash.com/photo-1613578519735-ce2724cdec3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")`}} className="splashPageSection">
       <div className="innerContainer">
        
          
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
          style={{border: error ?  "2px solid red" : ""}}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="formInput"
          style={{border: error ?  "2px solid red" : ""}}
        />

        <input
          type="date"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
          className="formInput"
          style={{border: error ?  "2px solid red" : ""}}
        />
  


        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="formButton"
        >
        Register
        </Button>
      
        <p className="formQuestion">Dont have an account? <a href="/">Login</a></p>
        {
        error 
        ?

        <p style={{color:"red"}}>error creating user</p>: 
        <p></p>
      
        }
       
      </Form>

      </div>
      
  </div>
    )
}
