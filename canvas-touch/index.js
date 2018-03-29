var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

ctx.fillRect(0, 0, 50, 50)

function getPosition(e) {
    var x = e.clientX - canvas.getBoundingClientRect().left,
        y = e.clientY - canvas.getBoundingClientRect().top

    return {
        x: x,
        y: y
    }
}

canvas.addEventListener('click', function(e) {
    console.log(getPosition(e))
})