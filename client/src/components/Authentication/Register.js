

import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "../../styles/Login.css"
import * as constants from "../../Constants"
import { ProgressBar} from  'react-loader-spinner'

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [register, setRegister] = useState(false);
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(false)


    
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

          setLoading(true)
          password.length > 4 && email.length > 4 ? 
          
          axios(configuration)
          
          .then((result) => {
            window.location.href = "/";

        
          })
          .catch((error) => {
            setError(true)
            error = new Error();
            setLoading(false)
          })
          
          :
          setLoading(false)
          setError(true)
          
        e.preventDefault();
        
       
      }
  
    return (
      <div className="LoginPage">

      <div style={{backgroundImage:`url("https://images.unsplash.com/photo-1683575967913-e1cf21874ed2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=401&q=80")`}} className="splashPageSection">
       <div className="innerContainer">
        
          
       </div>
      </div>
      <div className="formSection">

        {!loading ?

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

                  <p className="error">error creating user</p>: 
                  <p></p>

                  }

                  </Form>

                :

                <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor = '#87847b'
                      barColor = '#87847b'
              />

        }
      

      </div>
      
  </div>
    )
}
