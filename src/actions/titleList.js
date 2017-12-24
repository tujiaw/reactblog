import ActionsType from '.'
import fetch from '../common/fetch'

export const update = (data) => {
  return {
    type: ActionsType.getTitleList,
    data
  }
}

// http://3inns.cn/title?type=search&keyword=hello
// http://3inns.cn/title?type=tag&keyword=Qt
// http://3inns.cn/title?type=archive&keyword=2017-08
export const getTitleList = (url) => {
  return (dispatch, getState) => {
    fetch.getUrl(url).then((data) => {
      dispatch(update(data))
    })
  }
}
