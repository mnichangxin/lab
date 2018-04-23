/* 判断登录 */
import {getCookie} from './cookie'

const isLogin = function() {
    let P00001 = getCookie('P00001')

    if (P00001 != null) {
        return true
    } else {
        return false
    }
}

export {isLogin}