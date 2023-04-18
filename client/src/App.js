
import Profile from "./components/Profile/Profile";
import AddPosts from "./components/Profile/AddPost";
import Register from "./components/Authentication/Register";
import Posts from "./Posts/UserPosts";
import Trending from "./components/Trending/Trending";

import ProtectedRoute from "../src/components/Authentication/ProtectedRoute";
import { Routes ,Route } from 'react-router-dom';
import Login from "./components/Authentication/Login";
import Navbar from "./components/NavBar/Navbar";



function App() {
  return (


      <div>
        
        <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            
                
                <Route path='trending'
                 element={
                   <ProtectedRoute AuthenticatedComponent={<Trending/>} >
                  
                   </ProtectedRoute>
                 }
               />
                <Route path='/profile'
                 element={
                   <ProtectedRoute AuthenticatedComponent={<Profile section={<Posts url="/posts/getPosts"/>}/>} >
                  
                   </ProtectedRoute>
                 }
               />

              <Route path='/createPost'
                 element={
                   <ProtectedRoute AuthenticatedComponent={<Profile section={<AddPosts/>}/>} >
                  
                   </ProtectedRoute>
                 }
               />

        </Routes>

      </div>
      


      
      

      
  
  );
}

export default App;
