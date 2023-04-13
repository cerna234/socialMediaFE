import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../../styles/protectedRoute.css"
const cookies = new Cookies();



const Protected = ({  AuthenticatedComponent }) => {


const token = cookies.get("TOKEN");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (AuthenticatedComponent);

};
export default Protected;