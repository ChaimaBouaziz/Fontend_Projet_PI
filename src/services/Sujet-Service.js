import Axios from "../Axios/Api";
const SUJET_API="/sujets"
 const fetchSujets=async()=> {
 return await Axios.get(SUJET_API);
 }

 export const SujetService = {
    fetchSujets
 } 