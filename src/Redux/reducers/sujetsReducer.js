import {GET_SUJETS} from '../types'
const initialState={
 sujets:[]
};
const sujetsReducers =(state=initialState,action)=>{
 switch(action.type){
 case GET_SUJETS:
 return{
 ...state,
 sujets:action.payload,

 };
 default: return state
 }
}
export default sujetsReducers 