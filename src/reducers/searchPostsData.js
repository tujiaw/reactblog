import ActionsType from '../actions'

export default function searchPostsData(state = {}, action) {
  switch(action.type) {
    case ActionsType.getSearchPostsData:
      return action.data
    default:
      return state
  }
}