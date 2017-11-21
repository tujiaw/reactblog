import ActionsType from '.'
import fetch from '../common/fetch'

export const update = (data) => {
  return {
    type: ActionsType.getSearchPostsData,
    data
  }
}

export const getSearchPostsData = (url) => {
  return (dispatch, getState) => {
    fetch.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
