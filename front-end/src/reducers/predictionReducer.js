import { PREDICTING, GET_PREDICTION } from "../actions/types";

const initialState = {
    isSafe: null,
    error: false,
    message: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case PREDICTING:
            return {
                ...state,
                isSafe: null,
                error: false,
                message: null,
                loading: true,
            }
        case GET_PREDICTION:
            return {
                ...state,
                isSafe: action.isSafe,
                error: action.error,
                message: action.message,
                loading: false,
            }
        default:
            return state;
    }
}