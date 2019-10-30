
//import type
import {
    FETCH_STUDENT_BEGIN,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAILURE,
    POST_STUDENT_SUCCESS,
    POST_STUDENT_BEGIN,
    POST_STUDENT_FAILURE
} from '../actions/studentAction';

//init State (riêng component)
const initialState = {
    items: [],
    loading: false,
    error: null
};

// ...state : render lại thành phần ko đc thay đổi 
export default function studentReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUDENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case POST_STUDENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        //log: cục fetch API
        case FETCH_STUDENT_SUCCESS:
            {
                console.log("action.payload", action.payload)
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                };
            }

        //log: cục fetch API
        case POST_STUDENT_SUCCESS:
            {
                console.log("action.payload", action.payload)
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                };
            }

        case FETCH_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        case POST_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            return state;
    }
}