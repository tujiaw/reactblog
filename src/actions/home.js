import ActionsType from '.'
import fetch from '../common/fetch'

export const update = (data) => {
  return {
    type: ActionsType.getHomeData,
    data
  }
}

export const getHomeData = (page) => {
  return (dispatch, getState) => {
    fetch.getPosts(page).then((data) => {
      dispatch(update(data))
    })
  }
}
