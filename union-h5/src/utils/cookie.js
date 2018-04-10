/* Cookie 相关操作 */

var getCookie = function(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])             
    } else {
        return null             
    }
}

export {getCookie}
