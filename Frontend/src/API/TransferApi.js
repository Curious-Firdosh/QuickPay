import axios from "axios";
import toast from "react-hot-toast";


const VITE_API_URL= import.meta.env.VITE_API_URL
const TransferApi = async (amount , to) => {

    try {

        const token = localStorage.getItem("token")
        const response = await axios.post(
                    `${VITE_API_URL}api/v1/account/transfer`,
                    {amount, to},
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
             );
        
        toast.success(`${amount} Sent Successfully`)

        return response.data
    }
    catch (error) {
   
        // check if backend sent custom error message
        if (error.response) {
        console.error("❌ Backend Error:", error.response.data.message || error.response.data);
        // show backend error on screen
        toast.error(error.response.data.message || "Something went wrong");
        } else {
        console.error("❌ Network Error:", error.message);
        toast.error("Server not responding");
        }
    }
}

export default TransferApi

    
