import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {AiFillHeart,AiOutlineArrowLeft,AiFillFire} from "react-icons/ai"
import * as constants from "../Constants"
import "../styles/individualPost.css"
import Trending from "../components/Trending/Trending";
import Posts from "./UserPosts";
import Navbar from "../components/NavBar/Navbar";
const IndividualPost = () => {

    const { Id } = useParams();
   

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const [postData,setpostData] = useState();
    const[likes, setLikes] = useState()
    const [liked, setLiked] = useState()
    const[user, setUser] = useState()
  





    useEffect(() => {

     
     


      

        
        const configuration = {
            method: "get",
            url: `${constants.BASE_URL}/posts/post/${Id}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
          };
    
          
    
          axios(configuration)
          .then((result) => {
           

            console.log(result.data)
            setpostData(result.data.postInformation)
            setLikes(result.data.postInformation.likes.length)
            setLiked(result.data.postInformation.likes.includes(result.data.userInformation))
            setUser(result.data.userInformation)
            
            
           
          
       
             
    
    
   
           
          })
          .catch((error) => {
            error = new Error();
          });
        
     },[]);




     const postLike = async () => {
     

        
        const configuration = {
            method: "put",
            url: `${constants.BASE_URL}/posts/likePost`,
            data:{
                id: Id
            },
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
          };
    
          
    
          await axios(configuration)
          .then((result) => {
           
      
            setLikes(result.data.likes.length)
            setLiked(result.data.likes.includes(user))
            
            
           
       
             
    
    
   
           
          })
          .catch((error) => {
            error = new Error();
          });
        
     }


     const back = () => {
      window.location.href = "/profile";
     }
    return (
      <>
      <Navbar/>
      
      {postData  ? 


      <div className="individualPostPage">
        <div className="individualPostPageInner">
             

             <div className="individualPost">
             
               <div className="postImage" style={{backgroundImage:`url(${postData.postImage})`}}>
                 
                </div>
 
                 <div className="individualPostInfo">
                     <div className="individualpostInformation">
                         <p>{postData.title}</p>
                         <p>{postData.caption}</p>
                     </div>

                     <div className="individualPostInteractions">
                       <div className="individualPostInner">
                       <p onClick={() => {
                           postLike()
                         }}><AiFillHeart style={{color: liked == true ? "red" : "white"}} /></p>
                         <p>{likes}</p>

                       </div>
                       
             
                         
                     </div>

                 </div>
             </div>


             <div className="IndividualTrendingPosts">
               <div className="individualPostTrendingTitleContainer">
                 <AiFillFire className="trendingIcon"/>
                 <p className="trendingTitle">TRENDING POSTS</p>

               </div>
               
              <Posts url="/posts/trending"/>
             </div>
              
        </div>

      </div>
      

         :

         <div>WAITING</div>
        }
     
      </>
            
        
       
    )
}

export default IndividualPost;