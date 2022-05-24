import {GET_ARTICLES,DELETE_ARTICLE,ADD_ARTICLE,GET_SINGLE_ARTICLE,UPDATE_ARTICLE} from
"../types"
import {ArticleService} from "../../services/Article-Service";
export const loadArticles=()=>{
 return (dispatch)=>{
    ArticleService.fetchArticles()
 .then(res=>{
 dispatch({type:GET_ARTICLES, payload:res.data})

 }).catch((error)=>console.log(error));

 }
}
export const loadSinglearticle=(_id)=>{
 return (dispatch)=>{
    ArticleService.fetchArticleById(_id)
 .then((res)=>{
 dispatch({type:GET_SINGLE_ARTICLE,
 payload:res.data});
 }).catch((error)=>console.log(error));

 }
}
export const addarticle=(article)=>{
 return (dispatch)=>{
    ArticleService.addArticle(article)
 .then((res)=>{
 dispatch({type:ADD_ARTICLE,
 payload:res.data})

 }).catch((error)=>console.log(error));

 }
}
export const deletearticle=(_id)=>{
 return dispatch=>{
    ArticleService.deleteArticle(_id)
 .then((res)=>{
 dispatch({type:DELETE_ARTICLE,
 payload:_id})
 }).catch((error)=>console.log(error));

 }
}
export const updatearticle=(article)=>{
 return dispatch=>{
    ArticleService.editArticle(article)
 .then((res)=>{
 dispatch({type:UPDATE_ARTICLE,
 payload:res.data})
 }).catch((error)=>console.log(error));

 }
} 
