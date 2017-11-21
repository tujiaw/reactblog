import ActionsType from '../actions'

export default function homeData(state = {}, action) {
  switch(action.type) {
    case ActionsType.getHomeData:
      return action.data
    default:
      return state
  }
}