import { combineReducers } from "redux";
import predictionReducer from './predictionReducer';

export default combineReducers({
    prediction: predictionReducer
});