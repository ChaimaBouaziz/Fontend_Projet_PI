import {GET_ARTICLES,DELETE_ARTICLE,ADD_ARTICLE,GET_SINGLE_ARTICLE,UPDATE_ARTICLE} from
'../types'
const initialState={
 articles:[],
 article:{}

};
const articlesReducers =(state=initialState,action)=>{
 switch(action.type){
 case GET_ARTICLES:
 return{
 ...state,
 articles:action.payload,

 };
 case ADD_ARTICLE:
 return{
 ...state,
 articles : [...state.articles, action.payload],
 article:action.payload
 };
 case DELETE_ARTICLE:
 return{
 ...state,
 articles: state.articles.filter(article=> article._id !==
action.payload)
 };
 case UPDATE_ARTICLE:
 return {
 ...state,
 articles:state.articles.map(article => article._id === action.payload._id ? (article = action.payload) : article)
 };
 case GET_SINGLE_ARTICLE:
 return { ...state,
    article:action.payload };
 default: return state
 }
}
export default articlesReducers