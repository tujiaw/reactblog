import axios from 'axios'
import config from './config'

const fetch = {
    getPosts: (page) => {
        return new Promise((resolve, reject) => {
            page = page ? ('/?page=' + page) : '';
            axios.get(config.API_PREFIX + '/list' + page).then((res) => {
                if (res && res.data) {
                    resolve(res.data);
                }
            }).catch((error) => {
                console.log('getPosts error:' + error);
                reject(error);
            })
        })
    },
    getPost: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(config.API_PREFIX + '/post/' + id).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                console.log('getPost error:' + error);
                reject(error);
            })
        })
    }
}

export default fetch;