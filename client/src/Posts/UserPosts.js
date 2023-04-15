
import "../styles/userPosts.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as constants from "../Constants"




const UserPosts = () => {


    const [title, settitle] = useState("");
    const [caption, setcaption] = useState("");
    const [postImage, setpostImage] = useState(false);
    const [posts, setPosts] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
   

    useEffect(() => {

        
        const configuration = {
            method: "get",
            url: `${constants.BASE_URL}/posts/getPosts`,
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

     console.log(Object.keys(posts));
   
    return (
        <div className="userPosts">
        
         
            {posts.length > 0 ? 
            
            
               
        
    

                <Container fluid="xxl" >

                    <Row className="postsRow">
                {posts.map((value,key) => {
                    return(
                      
                           


                        <Col className="column" lg>
                            <div style={{backgroundImage:`url(${value.postImage})`}}  className="postPreview">
                                
                            </div>
                        
                        </Col>
                            

                       
                     
                    )
                })}
                    </Row>

                </Container>
         
            :
            <div className="noPosts"> no posts</div>
            
            }

           
        </div>
    )
}

export default UserPosts;