import { background, player, asteroids, WIDTH, HEIGHT } from "./entities.js";

var game = {
    context: <CanvasRenderingContext2D> ( <HTMLCanvasElement> document.getElementById("canvas") ).getContext('2d'),

    MainScene: [
        // todo: Add GameObjects to MainScene on Scene Start
        background,
        player,
        asteroids
    ],

    start():void {
        const canvas = <HTMLCanvasElement> document.getElementById("canvas");

        canvas.width  = WIDTH;
        canvas.height = HEIGHT;

        this.context.lineWidth = 4;

        this.MainScene.forEach( obj => {
            if ( obj.start != undefined ) {
                obj.start();
            }
        } );

        this.context.textBaseline = "middle";
        this.context.textAlign =    "center";

        document.addEventListener( "keydown", (e: KeyboardEvent) => {
            this.MainScene.forEach( obj => {
                if( obj.press == undefined ) { return; }

                // console.log( e.key + ": " + e.keyCode );
                if ( obj.press[ e.keyCode ] != undefined ) {
                    obj.press[ e.keyCode ]();
                }

            } );
        } );
    },

    draw():void {
        this.MainScene.forEach( obj => {
            if ( obj.draw != undefined ) {
                obj.draw( this.context );
            }
        } );
    },

    update( light:number ):void {
        this.MainScene.forEach( obj => {
            if ( obj.update != undefined ) {
                obj.update( light );
            }
        } );
    } 
} 

export default game;