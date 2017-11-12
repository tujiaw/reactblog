import axios from 'axios'
import Config from './Config'

const fetch = {
    getPosts: () => {
        return new Promise((resolve, reject) => {
            axios.get(Config.API_PREFIX + '/list').then((res) => {
                resolve(res.data);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    }
}

export default fetch;