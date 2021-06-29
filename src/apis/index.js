
import request from '@/utils/request'

/**
 * [测试接口]
 * @return {[type]} [description]
 */
export const getAuth = () => {
    return request.get('/user/getAuth');
}
