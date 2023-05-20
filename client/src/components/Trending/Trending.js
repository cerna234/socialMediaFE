import Posts from "../../Posts/UserPosts";
import "../../styles/trendingPosts.css"
import Navbar from "../NavBar/Navbar";
const Trending = () => {

    return(
        <>
        <Navbar/>
         <div className="trendingPosts">
           
           <p className="trendingPostTitle">TRENDING</p>
           <p className="trendingSubTitle">Curated collection of popular and engaging posts that are currently trending.</p>
  
          <Posts url="/posts/trending" page="trending"/>
        
         
       </div>
        </>
       
    )
}


export default Trending;