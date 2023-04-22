
import "../../styles/addPosts.css"
import {  useState } from "react";
import { Button } from "react-bootstrap";
import  axios  from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
import {AiOutlineCloudUpload } from "react-icons/ai";

const AddPosts = () => {
    const[title,setPostTitle] = useState();
    const[caption,setPostCaption] = useState();
    const [file, setFile] = useState()
    const [preview, setPreview] = useState(null)
  
   
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    



   
    const fileSelected = event => {
      const file = event.target.files[0]
          setPreview(URL.createObjectURL(event.target.files[0]))
          setFile(file)
         
      }

   
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const formData = new FormData();
      formData.append("image", file)
      formData.append("caption", caption)
      formData.append("title", title)
      await axios.post(`${constants.BASE_URL}/posts/createPost`, 
        formData, 
          { headers: {'Content-Type': 'multipart/form-data','Authorization' : `Bearer ${token}`}})

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
                  <div style={{backgroundImage:`url("${preview}")`}} className="postImagePreview"></div>
                  
                  <p className="postCaption">{caption}</p>

              </div>
               
            </div>

            <div className="postUploadSection">
               <form className="postUploadForm">
                
                 

               
               
                <input
                    type="text"
                    name="email"
                    value={title}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter Title"
                    className="postUploadInput"
                    
                />
                <input
                    type="text"
                    name="email"
                    value={caption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    placeholder="Enter Caption"
                    className="postUploadInput"
                    
                />

                
              <label class="custom-file-upload">
                <input onChange={fileSelected} type="file" accept="image/*"/>
                <AiOutlineCloudUpload className="uploadIcon"/>Upload
            </label>
               
               

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