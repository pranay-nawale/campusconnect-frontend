import axios from "axios"
import API from "../../../api/axios"

export const getDashboardData = async () => {
    try{
        const response = await API.get("/admin/dashboard");
        return response.data;
    }
    catch(error){
        console.log("dashboard api error: ",error);
        throw error;
    }
}