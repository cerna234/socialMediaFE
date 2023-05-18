


import "../../styles/navbar.css";
import navBardata from "./NavbarData";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
import { useEffect,useState } from "react";

import {AiOutlineCaretLeft,AiFillCaretRight} from "react-icons/ai"

const Navbar = () => {
   const [username,setUsername] = useState();
   const [navOpen, setNavOpen] = useState(true);
   const [profileImg,setProfileImg] = useState()
   

    const navigate = (test) => {
        window.location.href = test;
    }

    const cookies = new Cookies();

    // get token generated on login
    const token = cookies.get("TOKEN");
     // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  useEffect(() => {
    // set configurations for the API call here
    const configuration1 = {
      method: "get",
      url: `${constants.BASE_URL}/user/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

   


    // make the API call
    axios(configuration1)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setUsername(result.data.email);
        setProfileImg(result.data.profileImg)

     
        
      })
      .catch((error) => {
        error = new Error();
      });



  },
  
  
  
  
  []);


  const closeNav = () => {
    navOpen === true ? setNavOpen(false) : setNavOpen(true); 
  }
   
    return(


        <>
            {
            !navOpen ?
            <div className="navBar">


            
                <div onClick={closeNav} className="closeNavContainer">
                    <AiOutlineCaretLeft className="closeNav"/>
                </div>

                <div className="navProfileInfo">
                    <div onClick={ () => {navigate("/profile")}} className="profileImage" style={{backgroundImage: `url("${profileImg}")`}}></div>
                    <p className="userName">{username}</p>
                </div>
                {/* logout */}
                <Button className="navLogoutButton" type="submit" variant="danger" onClick={() => logout()}>
                Logout
                </Button>

                <div className="navButtonContainer">
                    {
                        navBardata.map((value,key) => {
                            return(
                                <button onClick={() => {navigate(value.location)}} key={key} className="buttonSection">
                                    <p className="navIcon">{value.icon}</p>
                                    <p className="navTitle">{value.title}</p>
                                </button>
                            )
                        })
                    }
                

                
                </div>


            </div>
            : 
            
            <div className="navBarClosed">


            
            <div onClick={closeNav} className="closeNavContainer">
                <AiFillCaretRight className="closeNav"/>
            </div>

           
           

            <div className="navButtonContainer">
                {
                    navBardata.map((value,key) => {
                        return(
                            <button onClick={() => {navigate(value.location)}} key={key} className="buttonSection">
                                <p className="navIconClosed">{value.icon}</p>
                            </button>
                        )
                    })
                }
            

            
            </div>


        </div>
            }
            
        </>
        
    )
}


export default Navbar