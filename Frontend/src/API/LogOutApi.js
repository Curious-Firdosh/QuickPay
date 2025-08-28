import axios from "axios";
import toast from "react-hot-toast";

export  async function LogOutApi () {

    try{
        await axios.post("http://localhost:4001/api/v1/user/logout", {}, { withCredentials: true });
        toast.success("Logged out successfully");
        // Optionally redirect to login page
    } 
    catch (error) {
      console.error("Logout failed", error);
    }
};

