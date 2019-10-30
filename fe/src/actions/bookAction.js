import {url} from '../callAPIs/url'
import {token} from '../callAPIs/token'

export const FETCH_BOOK_BEGIN   = 'FETCH_BOOK_BEGIN';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

export const POST_BOOK_BEGIN   = 'POST_BOOK_BEGIN';
export const POST_BOOK_SUCCESS = 'POST_BOOK_SUCCESS';
export const POST_BOOK_FAILURE = 'POST_BOOK_FAILURE';

export const fetchBOOKBegin = () => ({
  type: FETCH_BOOK_BEGIN
});

export const fetchBOOKSuccess = (data) => ({
  type: FETCH_BOOK_SUCCESS,
  payload: data 
});

export const fetchBOOKFailure = (error) => ({
  type: FETCH_BOOK_FAILURE,
  payload: error 
});

export const postBOOKBegin = () => ({
  type: POST_BOOK_BEGIN
});

export const postBOOKSuccess = (data) => ({
  type: POST_BOOK_SUCCESS,
  payload: data 
});

export const postBOOKFailure = (error) => ({
  type: POST_BOOK_FAILURE,
  payload: error 
});


//export fetchBOOK cho BOOKlist (mapDispatchToProps)
//fetch API -> json.data là: req.body.data (nodeJs)
export const fetchBooks = () => {
    return dispatch => {
      dispatch(fetchBOOKBegin());
      return fetch(url+"books",{
        method: 'get',
        body: JSON.stringify(),
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchBOOKSuccess(json.data));
          console.log('josn.data', json)
          return json.data;
        })
        .catch(error => dispatch(fetchBOOKFailure(error)));
    };
  }

  export const postBook = (opts) => {
    console.log('asd' ,opts)
    return dispatch => {
      dispatch(postBOOKBegin());
      return fetch(url+ "books",{
        method: 'post',
        body: JSON.stringify(opts),
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(postBOOKSuccess(json.data));
          console.log('josn1.data', json)
          return json.data;
        })
        .catch(error => dispatch(postBOOKFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }