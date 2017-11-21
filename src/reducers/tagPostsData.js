import ActionsType from '../actions'

export default function tagPostsData(state = {}, action) {
  switch(action.type) {
    case ActionsType.getTagPostsData:
      return action.data
    default:
      return state
  }
}