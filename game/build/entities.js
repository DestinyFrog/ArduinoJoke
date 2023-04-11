export const WIDTH = document.body.clientWidth;
export const HEIGHT = document.body.clientHeight;
const SPACE = "#241333";
function color_random() { return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`; }
;
const half_diagonal = Math.sqrt(Math.pow(WIDTH, 2) + Math.pow(WIDTH, 2)) / 2;
;
function Vector2(x, y) { return { x: x, y: y }; }
function rad(angle) { return angle * Math.PI / 180; }
;
var global = Vector2(WIDTH / 2, HEIGHT / 2);
export var background = {
    draw(ctx) {
        ctx.fillStyle = SPACE;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    },
};
export var player = {
    radius: 0,
    speed: 3,
    pos: { x: WIDTH / 2, y: HEIGHT / 2 },
    dir: Vector2(0, 0),
    press: {
        [38]: () => player.dir = Vector2(0, -1),
        [40]: () => player.dir = Vector2(0, 1),
        [37]: () => player.dir = Vector2(-1, 0),
        [39]: () => player.dir = Vector2(1, 0)
    },
    update(data) {
        this.radius = data * 2;
    },
    draw(ctx) {
        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;
        ctx.strokeStyle = this.color;
        ctx.font = (this.radius * 2) + "px Arial";
        ctx.fillText("🪐", this.pos.x, this.pos.y);
    },
};
const sprites = '👽 👻 👾 🧜‍♂️ 💃 🤺 🏇'.split(" ");
class rock {
    constructor() {
        this.speed = 1.5;
        this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
        this.angle = Math.floor(Math.random() * 360);
        this.distance = half_diagonal;
        this.position = Vector2(Math.cos(rad(this.angle)) * this.distance + global.x, Math.sin(rad(this.angle)) * this.distance + global.y);
        this.radius = Math.floor(Math.random() * 14 + 3);
    }
    draw(ctx) {
        this.distance -= this.speed;
        this.position = Vector2(Math.cos(rad(this.angle)) * this.distance + player.pos.x, Math.sin(rad(this.angle)) * this.distance + player.pos.y);
        if (player.radius > 1) {
            if (this.distance + this.radius < player.radius) {
                ctx.font = "40px Arial";
                ctx.fillText("💥", this.position.x, this.position.y);
                asteroids.rocks.shift();
                return;
            }
        }
        ctx.font = (this.radius * 3) + "px Arial";
        ctx.fillText(this.sprite, this.position.x, this.position.y);
    }
}
export var asteroids = {
    rocks: [],
    range: 0.9,
    draw(ctx) {
        this.rocks.forEach((obj) => obj.draw(ctx));
        if (Math.random() > this.range) {
            this.rocks.push(new rock());
        }
    },
};
