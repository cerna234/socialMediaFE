
import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "universal-cookie";
import "../../styles/profile.css"
import { FaBirthdayCake } from "react-icons/fa";
import * as constants from "../../Constants"
import Navbar from "../NavBar/Navbar";
import ProfileNav from "../../Posts/ProfileNav/ProfileNav";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Profile({section}) {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");
  const [numberOfPosts, setNumberOfPosts] = useState(0);

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration1 = {
      method: "get",
      url: `${constants.BASE_URL}/user/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const configuration2 = {
      method: "get",
      url: `${constants.BASE_URL}/posts/getPosts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };


    // make the API call
    axios(configuration1)
      .then((result) => {
        // assign the message in our result to the message we initialized above
      
        setMessage(result.data);
      
        
      })
      .catch((error) => {
        error = new Error();
      });


  axios(configuration2)
      .then((result) => {
       
       setNumberOfPosts(result.data.length);
        
      })
      .catch((error) => {
        error = new Error();
      });
  },
  
  
  
  
  []);

 


  return (
    <div className="profilePage">
     <Navbar/>
     
    
      <div className="innerContainer">

        <div className="profileInformation">
        
          <div className="profileInformationSection">

            
                <div style={{backgroundImage: `url(${message?.profileImg})`}} className="profileImg">

                </div>
            
          </div>
          
          <div className="profileInformationSection">
          
            <div className="userinformation">
              <p className="userInformationText">{message.email}</p>
              <p className="userInformationText">{numberOfPosts} {numberOfPosts > 1 ? " posts" : "post"}  </p>
              <p className="userInformationText"><FaBirthdayCake/> {message.birthday} </p>
             
             
            </div>
             
          </div>
         
        </div>


        <ProfileNav/>
        {section}

    

      </div>



      
      

      
    </div>
  );
}
