
import "../styles/userPosts.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as constants from "../Constants"





const Posts = ({url,page}) => {

    const navigate = useNavigate();
 
    const [posts, setPosts] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const [user,setUser] = useState(null);
    const [deleteWindow,setDeleteWindow] = useState(false)
    const [postToDelete,setPostToDelete] = useState(false)
    
    
   

    useEffect(() => {

        
        const configuration = {
            method: "get",
            url: `${constants.BASE_URL}${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
          };
    
          
    
          axios(configuration)
          .then((result) => {
           
                setPosts(result.data);
       
             
    
    
   
           
          })
          .catch((error) => {
            error = new Error();
          });

          const configuration1 = {
            method: "get",
            url: `${constants.BASE_URL}/user/profile`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios(configuration1)
      .then((result) => {
        // assign the message in our result to the message we initialized above
      
        setUser(result.data._id);
      
        
      })
      .catch((error) => {
        error = new Error();
      });
        
     },[]);


     const individualPost = (individualPostId) => {
       
        window.location.href = `/post/${individualPostId}`;
     }

     const deletePost = (postId) => {
        console.log("HELLO")
        
       
        const configuration = {
            method: "delete",
            url: `${constants.BASE_URL}/posts/deletePost`,
            data: {id : postId}
           
          };
    
          
    
          axios(configuration)
          .then((result) => {
           
                window.location.href = "/profile";
           
          })
          .catch((error) => {
            error = new Error();
          });
          
     }

   
    return (
        <div className="userPosts">
        
         
            {posts.length > 0 ? 
            
            
               
        
    
                
                <Container fluid="xxl" >
 
                    <Row className="postsRow">
                        

                        {deleteWindow ?

                        <div className="deleteWindow">
                            <div className="innerDeleteWindow">
                                <p className="deleteInfo" style={{color:"rgb(160, 35, 35)"}} onClick={() => {deletePost(postToDelete)}}>Delete Post</p>
                                <p className="deleteInfo" onClick={() => {setDeleteWindow(false)}}>cancel</p>
                            </div>
                          
                        </div>

                        :
                        ""
                        }
                        
                {posts.map((value,key) => {
                    return(
                      
                           

                        
                        <Col key={key}  className="column" lg>
                         
                       
                            <div style={{backgroundImage:`url(${value.postImage})`}}  className="postPreview">

                                    {value.author === user && page !== "trending" ? 
                                    <AiOutlineDelete onClick={() => {setPostToDelete(value._id); setDeleteWindow(true)} } className="deletePost"/>
                                            :
                                        ""
                                    }
                               <div onClick={() => {individualPost(value._id)}} className="postInfo">
                               
                                    <div className="postInfoInner">
                                   
                                        <p className="PostPreviewTitle">{value.title}</p>
                                        <div className="postPreviewLikeContainer">
                                            <AiFillHeart className="likedPreviewHeart"/>
                                            <p className="likedPreviewNumber">{value.likes?.length}</p>
                                        
                                        </div>
                                        
                                        

                                    </div>
                                    
                                 
                               </div> 
                               

                              
                            </div>
                        
                    
                        </Col>
                            

                       
                     
                    )
                })}
                    </Row>

                </Container>
         
            :
            <div className="noPosts"> 
                <p>Nothing here yet</p>
                

            </div>
            
            }

           
        </div>
    )
}

export default Posts;