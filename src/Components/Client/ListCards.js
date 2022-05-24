import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {loadArticles} from "../../Redux/Actions/articlesAction"
import AfficheCards from "./AfficheCards"
const ListCards=()=>{

 const dispatch = useDispatch();

 useEffect(() => {
 dispatch(loadArticles());
 });


 return(

 <div><AfficheCards/></div>
 )
}
export default ListCards 