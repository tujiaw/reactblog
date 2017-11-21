import { combineReducers } from 'redux'
import homeData from './homeData'
import postData from './postData'
import tagPostsData from './tagPostsData'
import searchPostsData from './searchPostsData'

export default combineReducers({
  homeData,
  postData,
  tagPostsData,
  searchPostsData,
})