
import "../../styles/addPosts.css"
import {  useState } from "react";
import { Button } from "react-bootstrap";
import  axios  from "axios";
import Cookies from "universal-cookie";
import * as constants from "../../Constants"
import {AiOutlineCloudUpload } from "react-icons/ai";
import { ProgressBar} from  'react-loader-spinner'

const AddPosts = () => {
    const[title,setPostTitle] = useState();
    const[caption,setPostCaption] = useState();
    const [file, setFile] = useState()
    const [preview, setPreview] = useState(null)
    const [loading,setLoading] = useState(false)
  

   
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    



   
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
            console.log(error)
          });
        
          
    
      }

     
    return (
      <>
      {!loading ?
      <div className="addPosts">
          
      <div className="postUploadSection">
        
        <input
              type="text"
              name="email"
              value={title}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter Title"
              className="postUploadInput"
              
        />
        <div style={{backgroundImage:`url("${preview}")`}} className="postImagePreview">

         
                
                  <label class="custom-file-upload-ProfileSettings">
                    <input className="imageuploadInput" onChange={fileSelected} type="file" accept="image/*"/>
                    <AiOutlineCloudUpload className="uploadIconProfileSettings"/>Profile Image
                  </label>

              
            
        </div>

        <input
              type="text"
              name="email"
              value={caption}
              onChange={(e) => setPostCaption(e.target.value)}
              placeholder="Enter Caption"
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
          


       
         
      </div>

      
    
  </div>
  :

  <div className="uploading">
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#87847b'
        barColor = '#87847b'
      />

  </div>

      
    }
   
        
        </>
    )
}


export default AddPosts;