import Axios from "../Axios/Api";
const ARTICLE_API="/articles"
 const fetchArticles=async()=> {
 return await Axios.get(ARTICLE_API);
 }
 const fetchArticleById=async(articleId)=> {
 return await Axios.get(ARTICLE_API + '/' + articleId);
 }
 const deleteArticle=async(articleId) =>{
 return await Axios.delete(ARTICLE_API + '/' + articleId);
 }
 const addArticle=async(article)=> {
 return await Axios.post(ARTICLE_API, article);

 }
 const editArticle=(article) =>{
 return Axios.put(ARTICLE_API + '/' + article._id, article);

 }

 export const ArticleService = {
 fetchArticles,
 fetchArticleById,
 deleteArticle,
 addArticle,
 editArticle
 } 
