
import "../../styles/profileSettings.css"
import Navbar from "../../components/NavBar/Navbar"
import { Form, Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
import {AiOutlineCloudUpload } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { ProgressBar} from  'react-loader-spinner'
const ProfileSettings = () => {

    const [username, setUsername] = useState("");
    const [file, setFile] = useState()
    const [backgroundColor, setColor] = useState()
    const [preview, setPreview] = useState(null)
    const [profileData,setProfileData] = useState()
    const [date,setDate] = useState()
    const [loading,setLoading] = useState(false)
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

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
        
          setProfileData(result.data);
          
          
        })
        .catch((error) => {
          error = new Error();
        });
  
  
   
    },
    
    
    
    
    []);

  const fileSelected = event => {
          

    if(event.target.files[0] !== undefined){
      const file = event.target.files[0];
      setPreview(URL.createObjectURL(event.target.files[0]))
      setFile(file)
    
      
      
    }
 
   
}
const handleSubmit = async (e) => {

  setLoading(true)
  const formData = new FormData();
  formData.append("profileImg", file)
  formData.append("profileBackgroundColor", backgroundColor)
  formData.append("birthday", date)


  
  await axios.put(`${constants.BASE_URL}/user/profileUpdate`, 
    formData, 
      { headers: {'Content-Type': 'multipart/form-data','Authorization' : `Bearer ${token}`}})

      .then((result) => {
        setLoading(false)
        window.location.href = "/profileSettings";
        
      })
      .catch((error) => {
        setLoading(false)
        error = new Error();
        console.log(error)
      });


  }



    return (
        <div className="profileSetingsPage">
            <Navbar/>
           

            {!loading ?

            <div className="profileSettingsInner" >
            <div style={{backgroundImage: `url(${ preview === null ? profileData?.profileImg : preview})`}} className="profileImageSettings">
              <label class="custom-file-upload-ProfileSettings">
                <input className="imageuploadInput" onChange={fileSelected} type="file" accept="image/*"/>
                <AiOutlineCloudUpload className="uploadIconProfileSettings"/>Profile Image
              </label>
            </div>
            

            



            <p style={{color:"red"}}>{backgroundColor}</p>

            

            <p className="profileSettingDate"><FaBirthdayCake/> {profileData?.birthday}</p>

            <input type="date" className="profileSettingDateInput" value={date} onChange={e => {setDate(e.target.value)}}></input>


            <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="formButton"
            >
            Submit
            </Button>

            </div>


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
    )
}


export default ProfileSettings;