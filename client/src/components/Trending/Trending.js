import Posts from "../../Posts/UserPosts";
import "../../styles/trendingPosts.css"
import Navbar from "../NavBar/Navbar";
const Trending = () => {

    return(
        <>
        <Navbar/>
         <div className="trendingPosts">
           
           <p className="trendingPostTitle">TRENDING</p>
  
          <Posts url="/posts/trending"/>
        
         
       </div>
        </>
       
    )
}


export default Trending;