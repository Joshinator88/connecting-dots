const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width;
let height;
let collide;

canvas.width = width = window.innerWidth;
canvas.height = height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

class Balls {
    constructor (x, y, radius, color, color2, vy, amplitude) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.color2 = color2;
        this.vy = vy;
        this.amplitude = amplitude;
        this.balls = balls
    }
    drawBalls() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill();
        ctx.closePath();
    }
    movingBalls() { 
        this.y -= this.vy;
        this.x += this.amplitude * Math.sin((1/200) * this.y); 
        if ((this.y + random(this.radius, 50)) < 0){
            this.y= (height + random(0, 100));
        }
        if ((this.x - this.radius) > window.innerWidth || this.x + this.radius < 0) {
            this.x = random(0, width);
            this.y = height;
        }
    }
    collisionDetection(){
        for (let j = 0;j < balls.length; j++) {
            if (!(this === balls[j])) {
                let dy = this.y - balls[j].y;
                let dx = this.x - balls[j].x;
                let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < 100) {
                        ctx.strokeStyle = this.color2;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.stroke();
                }
            }
            if (!(this === balls2[j])) {
                let dy = this.y - balls2[j].y;
                let dx = this.x - balls2[j].x;
                let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < 100) {
                        ctx.strokeStyle = this.color2;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(balls2[j].x, balls2[j].y);
                        ctx.stroke();
                }
            }
                
        }
    }
}


let balls = [];
let balls2 = [];

while (balls.length<100) {
    let ball = new Balls(
        random(0, width), 
        random (height*10, height), 
        4, 
        'blue',
        'blue', 
        random(4,8), 
        random((-width/500), (width/500)),
        balls);
    // let ball = new Balls(100, height, 20, 'white', 4, random((-width/500), (width/500))); // smallest amplitude
    balls.push(ball);
}
while (balls2.length<100) {
    let ball2 = new Balls(
        random(0, width), 
        random (height*10, height), 
        4, 
        'red',
        'red', 
        random(4,8), 
        random((-width/500), (width/500)),
        );
    // let ball = new Balls(100, height, 20, 'white', 4, random((-width/500), (width/500))); // smallest amplitude
    balls2.push(ball2);
}

function loop() {

    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(0,0, width, height);

    for (let i = 0; i< balls.length; i++) {
        balls[i].drawBalls();
        balls[i].movingBalls();
        balls[i].collisionDetection();

        balls2[i].drawBalls();
        balls2[i].movingBalls();
        balls2[i].collisionDetection();
    }
    requestAnimationFrame(loop);
}
loop();



// let firstBall = new Balls(100, 100, 50, 'blue');
// firstBall.drawBalls();