// setting: folder (actions[studentACtions], components[studentLists], reducers[rootReducer, studentReducer], store.js, index.js), 
//npm install redux react-redux redux-thunk --save

//defind: type
export const FETCH_STUDENT_BEGIN   = 'FETCH_STUDENT_BEGIN';
export const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
export const FETCH_STUDENT_FAILURE = 'FETCH_STUDENT_FAILURE';

export const POST_STUDENT_BEGIN   = 'POST_STUDENT_BEGIN';
export const POST_STUDENT_SUCCESS = 'POST_STUDENT_SUCCESS';
export const POST_STUDENT_FAILURE = 'POST_STUDENT_FAILURE';

export const fetchStudentBegin = () => ({
  type: FETCH_STUDENT_BEGIN
});

export const fetchStudentSuccess = (data) => ({
  type: FETCH_STUDENT_SUCCESS,
  payload: data 
});

export const fetchStudentFailure = (error) => ({
  type: FETCH_STUDENT_FAILURE,
  payload: error 
});

export const postStudentBegin = () => ({
  type: POST_STUDENT_BEGIN
});

export const postStudentSuccess = (data) => ({
  type: POST_STUDENT_SUCCESS,
  payload: data 
});

export const postStudentFailure = (error) => ({
  type: POST_STUDENT_FAILURE,
  payload: error 
});


//export fetchStudent cho studentlist (mapDispatchToProps)
//fetch API -> json.data là: req.body.data (nodeJs)
export const fetchStudent = () => {
    return dispatch => {
      dispatch(fetchStudentBegin());
      return fetch("http://localhost:4500/api/students",{
        method: 'get',
        body: JSON.stringify(),
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODRhMGEzNzlhN2E5NTQyN2M5M2I1MSIsInVzZXJuYW1lIjoibmFtYW5oIiwiZXhwIjoxNTc0MTU2OTYzLCJpYXQiOjE1Njg5NzI5NjN9.eu48mrO-uVHGPNBirrVca1b4UhhSSZ1s0-u2HMJVM34",
          "Content-Type": "application/json"
        }
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchStudentSuccess(json.data));
          console.log('josn.data', json)
          return json.data;
        })
        .catch(error => dispatch(fetchStudentFailure(error)));
    };
  }

  export const postStudent = (opts) => {
    console.log('asd' ,opts)
    return dispatch => {
      dispatch(postStudentBegin());
      return fetch("http://localhost:4500/api/students",{
        method: 'post',
        body: JSON.stringify(opts),
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODRhMGEzNzlhN2E5NTQyN2M5M2I1MSIsInVzZXJuYW1lIjoibmFtYW5oIiwiZXhwIjoxNTc0MTU2OTYzLCJpYXQiOjE1Njg5NzI5NjN9.eu48mrO-uVHGPNBirrVca1b4UhhSSZ1s0-u2HMJVM34",
          "Content-Type": "application/json"
        }
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(postStudentSuccess(json.data));
          console.log('josn1.data', json)
          return json.data;
        })
        .catch(error => dispatch(postStudentFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }