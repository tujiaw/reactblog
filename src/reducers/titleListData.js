import ActionsType from '../actions'

export default function titleListData(state = {}, action) {
  switch(action.type) {
    case ActionsType.getTitleList:
      return action.data
    default:
      return state
  }
}
