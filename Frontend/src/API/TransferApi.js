import axios from "axios";
import toast from "react-hot-toast";


const TransferApi = async (amount , to) => {

    try {

        const response = await axios.post(
                    "http://localhost:4001/api/v1/account/transfer",
                    {amount, to},
                    { withCredentials: true }
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

    
