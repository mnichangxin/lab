/*
 * n阶贝塞尔曲线工具
 */

// 起始点和终止点
var beginPos = {},
    endPos   = {}
// 点击点数组
var queue = []
// 贝塞尔点数组
var bezierNodes = []
// 用于绘制动画的贝塞尔点数组
var animationNodes = []
// 点的个数
var n = 0
// 等分点
var t = 0
// 被移动的点
var index = 0
// 按钮切换标志
var flag = false

/* 绘制圆形 */
function drawArc(x, y) {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ef19afd1'
    ctx.fillStyle = 'rgba(208, 208, 208, 0.5)'
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

/* 绘制直线 */
function drawLine(x1, y1, x2, y2, lineWidth) {
    ctx.beginPath()

    if (lineWidth) {
        ctx.lineWidth = lineWidth
    } else {
        ctx.lineWidth = 0.8
    }
  
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

/* 递归阶乘 */
function factorial(num) { 
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

/* 通过各控制点与占比t计算当前贝塞尔曲线上的点坐标 */
function bezier(arr, t) {
    var x = 0,
        y = 0,
        n = arr.length - 1

    arr.forEach(function(item, index) {
        if(!index) {
            x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
        } else {
            x += factorial(n) / factorial(index) / factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            y += factorial(n) / factorial(index) / factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
        }
    })

    return {
        x: x,
        y: y
    }
}

/* 构造贝塞尔曲线上的点 */
function createNode(nodes) {
    if (!nodes.length) {
        return
    }

    var next_nodes = []

    nodes.forEach(function(item, index) {
        var x = item.x,
            y = item.y

        if (nodes.length === 1) {
            bezierNodes.push(item)

            // if (bezierNodes.length > 1) {
            //     bezierNodes.forEach(function (obj, i) {
            //         if (i) {
            //             var startX = bezierNodes[i - 1].x,
            //                 startY = bezierNodes[i - 1].y,
            //                 x = obj.x,
            //                 y = obj.y

            //             ctx.strokeStyle = '#0090d2'
            //             drawLine(startX, startY, x, y, 3)
            //         } 
            //     })
            // }
        }
    })

    if (nodes.length) {
        for (var i = 0; i < nodes.length - 1; i++) {
            var arr = [{
                x: nodes[i].x,
                y: nodes[i].y
            }, {
                x: nodes[i + 1].x,
                y: nodes[i + 1].y
            }]
            next_nodes.push(bezier(arr, t))
        }

        createNode(next_nodes)
    }
}

/* 绘制贝塞尔曲线上的点 */
function drawNodes() {
    bezierNodes.forEach(function(item) {
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#0090d2'
        ctx.fillStyle = '#0090d2'
        ctx.arc(item.x, item.y, 1, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    })  
}

/* 绘制n阶贝塞尔曲线 */
function drawBezier() {
    if (t > 1) {
        return
    }

    var newQueue = queue.concat([])

    newQueue.unshift(beginPos)
    newQueue.push(endPos)

    t += 0.0005

    createNode(newQueue)
    drawBezier()
}

/* 重绘 Canvas */
function repaint() {
    ctx.clearRect(0, 0, 600, 600)

    drawArc(beginPos.x, beginPos.y)
    drawArc(endPos.x, endPos.y)

    for (var i = 0, len = queue.length; i < len; i++) {
        drawArc(queue[i].x, queue[i].y)
        
        if (i == 0) {
            drawLine(queue[i].x, queue[i].y, beginPos.x, beginPos.y)
        } else {
            drawLine(queue[i - 1].x, queue[i - 1].y, queue[i].x, queue[i].y)
        }

        if (i == len - 1) {
            drawLine(queue[i].x, queue[i].y, endPos.x, endPos.y)   
        }
    }

    drawBezier()
    drawNodes()
    showData()

    bezierNodes.forEach(function(item) {
        animationNodes.push(item)
    })

    t = 0
    bezierNodes = []
}

/* 鼠标在 Canvas 的坐标*/
function getPosition(e) {
    return {
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top
    }
}

/* 判断触发是否在圆形 */
function isInCircle(x, y) {
    var result = false
    var allPos = []
    
    allPos.push(beginPos)
    allPos.push(endPos)  
    allPos = allPos.concat(queue)

    for (var i = 0, len = allPos.length; i < len; i++) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = '#ef19afd1'
        ctx.fillStyle = 'rgba(208, 208, 208, 0.5)'
        ctx.arc(allPos[i].x, allPos[i].y, 8, 0, Math.PI * 2)
        
        if (ctx.isPointInPath(x, y)) {
            index = i - 2
            result = true
            break
        }
    }

    return result
}

/* 鼠标按下事件 */
function downEve(e) {
    var x = getPosition(e).x,
        y = getPosition(e).y
    
    if (isInCircle(x, y)) {
        canvas.addEventListener('mousemove', moveEve)
    }

    canvas.addEventListener('mouseup', upEve)
}

/* 鼠标移动事件 */
function moveEve(e) {
    var x = getPosition(e).x,
        y = getPosition(e).y

    if (index == -1) {
        endPos.x = x
        endPos.y = y
    } else if (index == -2) {
        beginPos.x = x
        beginPos.y = y
    } else {
        queue.splice(index, 1, {
            x: x,
            y: y
        })    
    }

    repaint()
}

/* 鼠标松下事件 */
function upEve(e) {
    var x = getPosition(e).x,
        y = getPosition(e).y

    if (!isInCircle(x, y)) {
        n++

        if (n == 1) {
            beginPos.x = x
            beginPos.y = y
        } else if (n == 2) {
            endPos.x = x
            endPos.y = y
            drawLine(beginPos.x, beginPos.y, endPos.x, endPos.y)
        } else {
            queue.push({
                x: x,
                y: y
            })
        }

        drawArc(x, y)  
        
        if (n > 2) {
            repaint()
            showData()
        }
    }

    canvas.removeEventListener('mousemove', moveEve)
    canvas.removeEventListener('mouseup', upEve)
}

/* 按钮切换事件 */
function switchEve() {
    if (!flag) {
        canvasAni.style.display = 'block'
        dataPanel.style.display = 'none'
        button.innerHTML = '切换数据'

        ctxAni.clearRect(0, 0, 600, 600)

        animationNodes.forEach(function(item) {
            setTimeout(function() {
                ctxAni.beginPath()
                ctxAni.lineWidth = 1
                ctxAni.strokeStyle = '#0090d2'
                ctxAni.fillStyle = '#0090d2'
                ctxAni.arc(item.x, item.y, 1, 0, Math.PI * 2)
                ctxAni.fill()
                ctxAni.stroke()
                ctxAni.closePath()
            }, 100)
        })

        animationNodes = []
    } else {
        canvasAni.style.display = 'none'
        dataPanel.style.display = 'block'
        button.innerHTML = '切换动画'
    }

    flag = !flag
}

/* 数据呈现 */
function showData() {
    var cp = ''

    for (var i = 0, len = queue.length; i < len; i++) {
        cp += '' + queue[i].x + ', ' + queue[i].y + ', '
    }

    var data = 'canvas = document.getElementById("canvas")' + '\n'
                + 'ctx = canvas.getContext("2d")' + '\n'
                + 'ctx.lineWidth = 1' + '\n'
                + 'ctx.strokeStyle = "#0090d2"' + '\n'
                + 'ctx.beginPath()' + '\n'
                + 'ctx.moveTo(' + beginPos.x + ', ' + beginPos.y + ')' + '\n' 
                + 'ctx.drawBezier('+ cp + endPos.x + ', ' + endPos.y +')' + '\n'
                + 'ctx.stroke()'

    dataPanel.innerHTML = data
}

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var canvasAni = document.getElementById('canvas-ani')
var ctxAni = canvasAni.getContext('2d')

var dataPanel = document.getElementById('data')
var button = document.getElementById('button')

canvas.addEventListener('mousedown', downEve)
button.addEventListener('click', switchEve)