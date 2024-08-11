import{combineReducers} from 'redux'
import loginReducer from '../reducers/login';
const allReducer = combineReducers({
    loginReducer,
})
export default allReducer;