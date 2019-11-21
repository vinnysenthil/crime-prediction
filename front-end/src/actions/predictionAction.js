import { PREDICTING, GET_PREDICTION } from './types';
import axios from "axios";

export const getPrediction = (dt, address) => dispatch => {
    dispatch({ type: PREDICTING });
    console.log("Predicting and calling endpoint!")
    axios.post(
        'http://localhost:3003/address', {dt, address}
    )
    .then(res => {
        console.log(res.data)
        dispatch({
            type: GET_PREDICTION,
            isSafe: res.data,
            message: "",
            error: false
        });
    })
    .catch(err => {
        console.log(err);

        dispatch({
            type: GET_PREDICTION,
            isSafe: null,
            message: err,
            error: true
        });
    })
    
}