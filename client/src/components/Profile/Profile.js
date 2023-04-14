
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import  Navbar from "../../components/NavBar/Navbar"
import "../../styles/profile.css"
import UserPosts from "./UserPosts";
import * as constants from "../../Constants"


const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Profile() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: `${constants.BASE_URL}/user/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };


    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data);
        
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);



  return (
    <div className="profilePage">
     
     
    
      <div className="innerContainer">
      
        <div className="profileInformation">
          <div className="profileInformationSection">
            <div className="profileImageSection">
                <div className="profileImg">

                </div>
            </div>
          </div>
          <div className="profileInformationSection">
            <div className="userinformation">
              <p className="userInformationText">{message.email}</p>
              <p className="userInformationText">293 Posts</p>
              <p className="userInformationText">12 Followrs</p>
             
            </div>
             
          </div>
          <div className="profileInformationSection">
            <p>MOOD ICON</p>
          </div>
        </div>


        <UserPosts/>

    

      </div>



      
      

      
    </div>
  );
}
