import ActionsType from '.'
import net from '../common/net'

export const update = (data) => {
  return {
    type: ActionsType.getHomeData,
    data
  }
}

export const getHomeData = (url) => {
  return (dispatch, getState) => {
    net.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
