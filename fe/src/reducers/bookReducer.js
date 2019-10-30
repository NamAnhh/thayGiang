
//import type
import {
    FETCH_BOOK_BEGIN,
    FETCH_BOOK_SUCCESS,
    FETCH_BOOK_FAILURE,
    POST_BOOK_SUCCESS,
    POST_BOOK_BEGIN,
    POST_BOOK_FAILURE
} from '../actions/bookAction';

//init State (riêng component)
const initialState = {
    items: [],
    loading: false,
    error: null
};

// ...state : render lại thành phần ko đc thay đổi 
export default function BOOKReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOK_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case POST_BOOK_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        //log: cục fetch API
        case FETCH_BOOK_SUCCESS:
            {
                console.log("action.payload", action.payload)
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                };
            }

        //log: cục fetch API
        case POST_BOOK_SUCCESS:
            {
                console.log("action.payload", action.payload)
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                };
            }

        case FETCH_BOOK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        case POST_BOOK_FAILURE:
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