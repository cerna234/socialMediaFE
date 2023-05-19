import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../../styles/Login.css"
import * as constants from "../../Constants"
import { ProgressBar} from  'react-loader-spinner'

export default function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [login, setLogin] = useState(false);
const [ error,setError] = useState(false)
const [loading,setLoading] = useState(false)
const cookies = new Cookies();

const handleSubmit = (e) => {
  setLoading(true);
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


        
        window.location.href = "/profile";
      })
      .catch((error) => {
        error = new Error();
        setError(true)
        console.log(error)
        setLoading(false)
      });
    e.preventDefault();

  }
    return (
        <div className="LoginPage">
            
            <div style={{backgroundImage:`url("https://images.unsplash.com/photo-1594445863100-9cbf9d747e1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80")`}} className="splashPageSection">
             <div  className="SplashinnerContainer">
                <p className="loginSplashTitle">Welcome back!</p>
                <p className="loginSplashSubtext">Sign in to access your account.</p>
             </div>
            </div>
            <div className="formSection">

              {!loading ?
                   <Form className="form" onSubmit={(e)=>handleSubmit(e)}>


                   <h2 className="formTitle">SIGN IN</h2>
                   <input
                     type="email"
                     name="email"
                     value={email}
                     onChange={e => { setEmail(e.target.value); setError(false) }}
                     placeholder="Enter email"
                     className="formInput"
                     style={{border: error ?  "2px solid red" : ""}}
                   />
     
                   <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={e => {setPassword(e.target.value); setError(false) }}
                     placeholder="Password"
                     className="formInput"
                     style={{border: error ?  "2px solid red" : ""}}
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
                   {
                   error 
                     ?
     
                   <p style={{color:"red"}}>Wrong username or password.</p>: 
                   <p></p>
           
             }
     
                  
                 </Form>


            :

            <div>

              <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor = '#87847b'
                      barColor = '#87847b'
              />
            </div>
              }
         

            </div>
            
        </div>
    )
}
