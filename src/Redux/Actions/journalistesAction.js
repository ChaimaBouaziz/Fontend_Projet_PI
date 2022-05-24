import {GET_JOURNALISTES} from "../types"
import {JournalisteService} from "../../services/Journaliste-Service";
export const loadJournalistes=()=>{
 return (dispatch)=>{
    JournalisteService.fetchJournalistes()
 .then(res=>{
 dispatch({type:GET_JOURNALISTES,
 payload:res.data})

 }).catch((error)=>console.log(error));

 }
} 
