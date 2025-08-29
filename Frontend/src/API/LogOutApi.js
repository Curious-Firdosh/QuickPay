import axios from "axios";
import toast from "react-hot-toast";


const VITE_API_URL= import.meta.env.VITE_API_URL
export  async function LogOutApi () {

    try{
        await axios.post(`${VITE_API_URL}api/v1/user/logout`, {}, { withCredentials: true });
        toast.success("Logged out successfully");
        // Optionally redirect to login page
    } 
    catch (error) {
      console.error("Logout failed", error);
    }
};

