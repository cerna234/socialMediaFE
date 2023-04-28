
import "../../styles/profileSettings.css"
import Navbar from "../../components/NavBar/Navbar"
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
const ProfileSettings = () => {

    const [username, setUsername] = useState("");
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");


const handleSubmit = (e) => {
    const configuration = {
        method: "put",
        url: `${constants.BASE_URL}/user/profileUpdate`,

        headers: {
            Authorization: `Bearer ${token}`,
          },
        data: {
          
        email :  username,
        profileImg: username,
        
        profileBackgroundImage: username
         
        },
      };


      axios(configuration)
      .then((result) => {
        console.log(result.data)
       


      
        
      })
      .catch((error) => {
        error = new Error();
      });
    e.preventDefault();

  }
    return (
        <div className="profileSetingsPage">
            <Navbar/>
           

            <Form className="profileSettingsInner" >
                <div className="profileImageSettings">
                 
                 </div>
                 <button>change profile image</button>

                 


               
        


                 <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter new Username"
                className="formInput"
              />


                <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="formButton"
              >
              Submit
                </Button>

            </Form>

            
        </div>
    )
}


export default ProfileSettings;