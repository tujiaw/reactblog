import axios from 'axios'
import config from './config'

function getData(url) {
    return new Promise((resolve, reject) => {
        console.log('get url:' + url)
        axios.get(url).then((res) => {
            if (res && res.data) {
                resolve(res.data);
                window.scrollTo(0, 0)
            }
        }).catch((error) => {
            console.log('get data error:' + error);
            reject(error);
        })
    })
}

const fetch = {
    getUrl: (url) =>{
        return getData(config.API_PREFIX + url);
    },
    getPosts: (page) => {
        page = page ? ('/?page=' + page) : '';
        return getData(config.API_PREFIX + '/list' + page);
    },
    getPost: (id) => {
        return getData(config.API_PREFIX + '/post/' + id);
    },
    getTagPost: (tagname) => {
        return getData(config.API_PREFIX + '/tags/' + tagname);
    },
    getSearch: (keyword) => {
        return getData(config.API_PREFIX + '/search?keyword=' + keyword);
    }
}

export default fetch;