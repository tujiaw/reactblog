import ActionsType from '.'
import net from '../common/net'

export const update = (data) => {
  return {
    type: ActionsType.getPostData,
    data
  }
}

export const getPostData = (url) => {
  return (dispatch, getState) => {
    net.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
