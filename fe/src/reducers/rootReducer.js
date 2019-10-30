
import studentReducer from '../reducers/studentReducer';
import bookReducer from '../reducers/bookReducer'
import { combineReducers } from 'redux';


const appReducer = combineReducers({
	studentRoot:studentReducer,
	bookRoot:bookReducer
})

const rootReducer = (state, action) => {
	return appReducer(state, action)
}


export default rootReducer