import { combineReducers } from "redux";
import articlesReducers from "./articlesReducer";
import sujetsReducers from "./sujetsReducer";
import journalistesReducers from "./journalistesReducer";

const rootReducer= combineReducers({
 allarticles:articlesReducers,
 allsujets:sujetsReducers,
 alljournalistes:journalistesReducers, 
});
export default rootReducer 
