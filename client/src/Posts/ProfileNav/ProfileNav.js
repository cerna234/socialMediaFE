import { useNavigate } from "react-router-dom";
import "../../styles/ProfileNav.css"
import { AiOutlinePlusSquare,AiOutlineAppstore,AiFillHeart } from "react-icons/ai";


const ProfileNav = () => {

    const navigate = useNavigate();
    return (
        <div className="ProfileNav">
            <div className="innerProfileNav">

                <button className="profileNavButton" onClick={() => {
                    navigate("/profile");
                }}>
                    <AiOutlineAppstore className="ProfileIcon"/>
                    
                </button>

                <button className="profileNavButton" onClick={() => {
                    navigate("/createPost");
                }}>

                    <AiOutlinePlusSquare className="ProfileIcon"/>
                    
                </button>

                <button className="profileNavButton" onClick={() => {
                    navigate("/");
                }}>

                    <AiFillHeart className="ProfileIcon"/>
                </button>
            </div>
            
        </div>
    )
}


export default ProfileNav;