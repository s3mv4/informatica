const canvas = document.getElementById("pong")
const ctx = canvas.getContext("2d")
const fps = 60

document.addEventListener("keydown", event => {
    if (event.keyCode == 87) {
        paddle1.yvelocity = -4
    } else if (event.keyCode == 83) {
        paddle1.yvelocity = 4
    } 
    if (event.keyCode == 38) {
        paddle2.yvelocity = -4
    } else if (event.keyCode == 40) {
        paddle2.yvelocity = 4
    }
})

document.addEventListener("keyup", event => {
    if (event.keyCode == 87) {
        paddle1.yvelocity = 0
    } else if (event.keyCode == 83) {
        paddle1.yvelocity = 0
    } 
    if (event.keyCode == 38) {
        paddle2.yvelocity = 0
    } else if (event.keyCode == 40) {
        paddle2.yvelocity = 0
    }
})

const ball = {
    x: canvas.width/2-25/2,
    y: canvas.height/2-25/2,
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
    score: 0,
}

const paddle2 = {
    x: canvas.width-25,
    y: canvas.height/2-100/2,
    width: 25,
    height: 100,
    yvelocity: 0,
    score: 0,
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function drawText(x, y, text, size, color) {
    ctx.fillStyle = color
    ctx.font = `${size}px sans-serif`
    ctx.fillText(text, x, y)
}

function ballMovement() {
    ball.x += ball.xvelocity
    ball.y += ball.yvelocity

    if (ball.y + ball.yvelocity <= (paddle1.y + paddle1.height) &&
        (ball.y + ball.size) + ball.yvelocity >= paddle1.y &&
        ball.x + ball.xvelocity <= (paddle1.x + paddle1.width)) {
        ball.xvelocity *= -1
    }

    if (ball.y + ball.yvelocity <= (paddle2.y + paddle2.height) &&
        (ball.y + ball.size) + ball.yvelocity >= paddle2.y &&
        (ball.x + ball.size) + ball.xvelocity >= paddle2.x) {
        ball.xvelocity *= -1
    }

    if (ball.x + ball.xvelocity <= 0 + paddle1.width) {
        paddle2.score += 1
        ball.x = canvas.width/2-ball.size/2
        ball.y = canvas.height/2-ball.size/2
    } else if ((ball.x + ball.size) + ball.xvelocity >= canvas.width - paddle2.width) {
        paddle1.score += 1
        ball.x = canvas.width/2-ball.size/2
        ball.y = canvas.height/2-ball.size/2
    }

    if (ball.y + ball.yvelocity <= 0) {
        ball.yvelocity *= -1
    } else if ((ball.y + ball.size) + ball.xvelocity >= canvas.height) {
        ball.yvelocity *= -1
    }
}

function paddleMovement() {
    paddle1.y += paddle1.yvelocity
    paddle2.y += paddle2.yvelocity

    if (paddle1.y < 0) {
        paddle1.y = 0
    } else if (paddle1.y + paddle1.height > canvas.height) {
        paddle1.y = canvas.height-paddle1.height
    }

    if (paddle2.y < 0) {
        paddle2.y = 0
    } else if (paddle2.y + paddle2.height > canvas.height) {
        paddle2.y = canvas.height-paddle2.height
    }
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
