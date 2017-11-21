import ActionsType from '.'
import fetch from '../common/fetch'

export const update = (data) => {
  return {
    type: ActionsType.getHomeData,
    data
  }
}

export const getHomeData = (url) => {
  return (dispatch, getState) => {
    fetch.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
