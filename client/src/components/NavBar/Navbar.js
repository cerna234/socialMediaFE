


import "../../styles/navbar.css";
import navBardata from "./NavbarData";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";


const Navbar = () => {
   

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
   
    return(
        <div className="navBar">
            <div className="navProfileInfo">
                <div className="profileImage"></div>
                <p>Username</p>
            </div>
            {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
           
            <div className="navButtonContainer">
                {
                    navBardata.map((value,key) => {
                        return(
                            <button onClick={() => {navigate(value.location)}} key={key} className="buttonSection">
                                <p>{value.icon}</p>
                                <p>{value.title}</p>
                            </button>
                        )
                    })
                }
              

               
            </div>
            
           
        </div>
    )
}


export default Navbar