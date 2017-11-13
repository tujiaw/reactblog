import axios from 'axios'
import Config from './Config'

const fetch = {
    getPosts: () => {
        return new Promise((resolve, reject) => {
            axios.get(Config.API_PREFIX + '/list').then((res) => {
                resolve(res.data);
            }).catch((error) => {
                console.log('getPosts error:' + error);
                reject(error);
            })
        })
    },
    getPost: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(Config.API_PREFIX + '/post/' + id).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                console.log('getPost error:' + error);
                reject(error);
            })
        })
    }
}

export default fetch;