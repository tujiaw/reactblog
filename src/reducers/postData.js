import ActionsType from '../actions'

export default function postData(state = {}, action) {
  switch(action.type) {
    case ActionsType.getPostData:
      return action.data
    default:
      return state
  }
}