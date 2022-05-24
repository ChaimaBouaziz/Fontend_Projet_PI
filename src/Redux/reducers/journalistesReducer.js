import {GET_JOURNALISTES} from '../types'
const initialState={
 journalistes:[]
};
const journalistesReducers =(state=initialState,action)=>{
 switch(action.type){
 case GET_JOURNALISTES:
 return{
 ...state,
 journalistes:action.payload,

 };
 default: return state
 }
}
export default journalistesReducers 