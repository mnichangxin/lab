/* 日期时间戳转换 */

const stamp2Date = function(stamp) {
    let date = new Date(stamp)

    let y = date.getFullYear(),
        m = date.getMonth() + 1 > 10 ? (date.getMonth() + 1).toString : '0' + (date.getMonth() + 1),
        d = date.getDate() > 10 ? date.getDate().toString() : '0' + date.getDate()

    return y + '/' + m + '/' + d
}

const date2Stamp = function(date) {
    return Date.parse(new Date(date))
}

export {stamp2Date, date2Stamp}

