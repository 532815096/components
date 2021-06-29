import axios from 'axios';
import qs from 'qs';
import { dev, conmomPrams } from '@config'

let BASE_URL = '';
const REQ_INSTANCE = axios.create({
    ...conmomPrams,
    baseURL: BASE_URL,
});

/**
 * [请求统一处理代码]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
REQ_INSTANCE.interceptors.request.use(
    (config) => {
        config.url = process.env.NODE_ENV !== 'production' && dev.ISMOCK ? `mock${config.url}` : config.url
        if (config.method == 'post') {
            config.data = qs.stringify(config.data);
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * [响应统一处理代码]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
REQ_INSTANCE.interceptors.response.use(
    (res) => {
        const { data, status } = res
        if (status === 200 && data && (data.code === 200 || data.code === 0)) {
            return data
        }
    },
    (error) => {
        let url = ''
        if (error.response === undefined) {
            console.error(`接口(${url})请求出错`);
        }
        switch (error.response.status) {
            case 400:
                error.message = '请求错误(400)';
                break;
            case 403:
                error.message = '拒绝访问(403)';
                break;
            case 404:
                error.message = '请求出错(404)';
                break;
            case 500:
                error.message = '服务器错误(500)';
                break;
            case 502:
                error.message = '网络错误(502)';
                break;
            case 503:
                error.message = '服务不可用(503)';
                break;
            case 504:
                error.message = '网络超时(504)';
                break;
            default:
                error.message = `连接出错(${error.response.status})!`;
        }
        console.error(error.message);
    }
);

export default REQ_INSTANCE;
