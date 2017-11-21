import ActionsType from '.'
import fetch from '../common/fetch'

export const update = (data) => {
  return {
    type: ActionsType.getPostData,
    data
  }
}

export const getPostData = (url) => {
  return (dispatch, getState) => {
    fetch.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
