/* Cookie 相关操作 */

var getCookie = function(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])             
    } else {
        return null             
    }
}

var removeCookie = function(name) {
    let exp = new Date()

    exp.setTime(exp.getTime() - 1)

    if (getCookie('P00001') != null) {
        document.cookie = name + '=' + getCookie('P00001') + ';expires=' + exp.toGMTString() + 'domain=' + '.iqiyi.com;'
    }
}

export {getCookie, removeCookie}
