import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {loadArticles} from "../../Redux/Actions/articlesAction"
import AfficheArticles from "./AfficheArticles"
const ListArticles=()=>{

 const dispatch = useDispatch();

 useEffect(() => {
 dispatch(loadArticles());
 });


 return(

 <div><AfficheArticles/></div>
 )
}
export default ListArticles 
