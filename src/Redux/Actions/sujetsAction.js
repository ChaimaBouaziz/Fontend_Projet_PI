import {GET_SUJETS} from "../types"
import {SujetService} from "../../services/Sujet-Service";
export const loadSujets=()=>{
 return (dispatch)=>{
 SujetService.fetchSujets()
 .then(res=>{
 dispatch({type:GET_SUJETS,
 payload:res.data})

 }).catch((error)=>console.log(error));

 }
} 