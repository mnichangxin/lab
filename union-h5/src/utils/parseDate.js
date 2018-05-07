/* 日期操作方法 */

// 时间戳转日期
const stamp2Date = function(stamp) {
    let date = new Date(stamp)

    let y = date.getFullYear(),
        m = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1),
        d = date.getDate() >= 10 ? date.getDate().toString() : '0' + date.getDate()

    return y + '/' + m + '/' + d
}

// 日期转时间戳
const date2Stamp = function(date) {
    return (new Date(date)).getTime()
}

// 获取前一个月
const getPreMonth = function() {
    let date = new Date()

    let y = date.getFullYear(),
        m = date.getMonth()

    if (m == 0) {
        y = y - 1,
        m = 12
    } else {
        if (m < 10) {
            m = '0' + m
        }
    }

    return y + '/' + m + '/' + '01'
}

export {stamp2Date, date2Stamp, getPreMonth}

