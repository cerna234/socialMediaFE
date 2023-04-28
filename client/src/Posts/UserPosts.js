
import "../styles/userPosts.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as constants from "../Constants"




const Posts = ({url}) => {

    const navigate = useNavigate();
 
    const [posts, setPosts] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    
   

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
        
     },[]);


     const individualPost = (individualPostId) => {
       
        window.location.href = `/post/${individualPostId}`;
     }


   
    return (
        <div className="userPosts">
        
         
            {posts.length > 0 ? 
            
            
               
        
    

                <Container fluid="xxl" >

                    <Row className="postsRow">
                {posts.map((value,key) => {
                    return(
                      
                           


                        <Col key={key} onClick={() => {individualPost(value._id)}} className="column" lg>
                            <div style={{backgroundImage:`url(${value.postImage})`}}  className="postPreview">
                               <div className="postInfo">
                                    <div className="postInfoInner">
                                        <p>{value.title}</p>
                                        <p>{value.caption}</p>

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