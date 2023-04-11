import { background, player, asteroids, WIDTH, HEIGHT } from "./entities.js";
var game = {
    context: document.getElementById("canvas").getContext('2d'),
    MainScene: [
        background,
        player,
        asteroids
    ],
    start() {
        const canvas = document.getElementById("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        this.context.lineWidth = 4;
        this.MainScene.forEach(obj => {
            if (obj.start != undefined) {
                obj.start();
            }
        });
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        document.addEventListener("keydown", (e) => {
            this.MainScene.forEach(obj => {
                if (obj.press == undefined) {
                    return;
                }
                if (obj.press[e.keyCode] != undefined) {
                    obj.press[e.keyCode]();
                }
            });
        });
    },
    draw() {
        this.MainScene.forEach(obj => {
            if (obj.draw != undefined) {
                obj.draw(this.context);
            }
        });
    },
    update(light) {
        this.MainScene.forEach(obj => {
            if (obj.update != undefined) {
                obj.update(light);
            }
        });
    }
};
export default game;
