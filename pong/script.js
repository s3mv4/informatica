const canvas = document.getElementById("pong")
const ctx = canvas.getContext("2d")
const fps = 120

document.addEventListener("keydown", event => {
    console.log(event.keyCode)
    if (event.keyCode == 188) {
        paddle1.yvelocity = -4
    } else if (event.keyCode == 79) {
        paddle1.yvelocity = 4
    } 
    if (event.keyCode == 38) {
        paddle2.yvelocity = -4
    } else if (event.keyCode == 40) {
        paddle2.yvelocity = 4
    }
})

document.addEventListener("keyup", event => {
    console.log(event.keyCode)
    if (event.keyCode == 188) {
        paddle1.yvelocity = 0
    } else if (event.keyCode == 79) {
        paddle1.yvelocity = 0
    } 
    if (event.keyCode == 38) {
        paddle2.yvelocity = 0
    } else if (event.keyCode == 40) {
        paddle2.yvelocity = 0
    }
})

const ball = {
    x: 0,
    y: 0,
    size: 25,
    xvelocity: 2,
    yvelocity: 2,
}

const paddle1 = {
    x: 0,
    y: canvas.height/2-100/2,
    width: 25,
    height: 100,
    yvelocity: 0,
}

const paddle2 = {
    x: canvas.width-25,
    y: canvas.height/2-100/2,
    width: 25,
    height: 100,
    yvelocity: 0,
}

function drawRect(x, y, w, h, hex) {
    ctx.fillStyle = hex
    ctx.fillRect(x, y, w, h)
}

function ballMovement() {
    ball.x += ball.xvelocity
    ball.y += ball.yvelocity

    if (ball.x <= 0) {
        ball.xvelocity *= -1
    } else if (ball.y <= 0) {
        ball.yvelocity *= -1
    } else if (ball.x + ball.size >= canvas.width) {
        ball.xvelocity *= -1
    } else if (ball.y + ball.size >= canvas.height) {
        ball.yvelocity *= -1
    }
}

function paddleMovement() {
    paddle1.y += paddle1.yvelocity
    paddle2.y += paddle2.yvelocity
}

function main() {
    drawRect(0, 0, canvas.width, canvas.height, "#000000")
    drawRect(ball.x, ball.y, ball.size, ball.size, "#ffffff")
    drawRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height, "#ffffff")
    drawRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height, "#ffffff")
    ballMovement()
    paddleMovement()
}

setInterval(main, 1000/fps)
