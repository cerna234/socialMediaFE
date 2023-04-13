
import FreeComponent from "./components/FreeComponent";
import Profile from "./components/Profile/Profile";
import Register from "./components/Authentication/Register";

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
                <Route  path="/free" element={<FreeComponent/>} />
                
                <Route path='/profile'
                 element={
                   <ProtectedRoute AuthenticatedComponent={<Profile/>} >
                  
                   </ProtectedRoute>
                 }
               />

        </Routes>

      </div>
      


      
      

      
  
  );
}

export default App;
