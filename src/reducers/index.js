import { combineReducers } from 'redux'
import homeData from './homeData'
import postData from './postData'
import titleListData from './titleListData'

export default combineReducers({
  homeData,
  postData,
  titleListData,
})