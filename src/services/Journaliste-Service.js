import Axios from "../Axios/Api";
const JOURNALISTE_API="/journalistes"
 const fetchJournalistes=async()=> {
 return await Axios.get(JOURNALISTE_API);
 }

 export const JournalisteService = {
    fetchJournalistes
 }