import Profile from "./Profile";
import "../../styles/addPosts.css"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import  axios  from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
import {AiFillFastBackward } from "react-icons/ai";

const AddPosts = () => {
    const[title,setPostTitle] = useState();
    const[caption,setPostCaption] = useState();
    const[postImage,setPostImage] = useState(null);
  
   
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    



   

   
    const handleSubmit = (e) => {

      
        const configuration = {
            method: "post",
            url: `${constants.BASE_URL}/posts/createPost`,
            data: {
              title,
              caption,
              postImage
            },
            headers: {
                Authorization: `Bearer ${token}`,
              },
          };
    
    
          axios(configuration)
          .then((result) => {
            
    
    
          
            window.location.href = "/profile";
          })
          .catch((error) => {
            error = new Error();
          });
        e.preventDefault();
    
      }

     
    return (

        <div className="addPosts">

            <div className="postUploadSection">
              <div className="postUploadPreview">
                  <p className="postTitle">{title}</p>
                  <div style={{backgroundImage:`url("${postImage}")`}} className="postImagePreview"></div>
                  
                  <p className="postCaption">{caption}</p>

              </div>
               
            </div>

            <div className="postUploadSection">
               <form className="postUploadForm">
                
                 

               
               
                <input
                    type="email"
                    name="email"
                    value={title}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter Title"
                    className="postUploadInput"
                    
                />
                <input
                    type="email"
                    name="email"
                    value={caption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    placeholder="Enter Caption"
                    className="postUploadInput"
                    
                />

                <input
                    type="email"
                    name="email"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    placeholder="Enter image"
                    className="postUploadInput"
                    
                />  
                
               
               

                <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="formButton"
              >
              Add Post
              </Button>

              
               </form>
            </div>
          
        </div>
    )
}


export default AddPosts;