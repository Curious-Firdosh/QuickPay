
import axios from "axios";
import toast from "react-hot-toast";



const VITE_API_URL= import.meta.env.VITE_API_URL
const SignupApi = async(data ,navigate , reset) => {

    try{
        
        const response = await axios.post(
             `${VITE_API_URL}api/v1/user/signup`,
            data ,
            { withCredentials: true }
         )

        console.log("✅ Backend Response:", response.data);
        toast.success("Account Created SuccessFully 🎉🎉")

        navigate("/login")

        reset();

    }
    catch (error) {
   
            // check if backend sent custom error message
            if (error.response) {
                
                console.error("❌ Backend Error:", error.response.data.message || error.response.data);
                // show backend error on screen
                toast.error(error.response.data.message || "Something went wrong");
            } 
            else {
                console.error("❌ Network Error:", error.message);
                toast.error("Server not responding");
            }
    }
}

export default SignupApi