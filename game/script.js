import game from './build/game.js';

// connect to websocket
const socket = new WebSocket( 'ws://localhost:8080' );

socket.onopen = () => {
    console.log( "Connection started with websocket" );

    game.start();
    requestAnimationFrame( main );
}

// listen for messages
socket.onmessage = ( { data } ) => {
    game.update( data );
}

function main() {
    game.draw();
    requestAnimationFrame( main );
}
