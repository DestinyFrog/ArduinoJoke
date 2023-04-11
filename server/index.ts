// importaçoes
import { SerialPort } from "serialport";
import express from 'express';
import * as WebSocket from 'ws';
import * as colors from 'colors';
import * as dotenv from 'dotenv';
import { appendFile } from 'fs';

dotenv.config();
colors.enable();

var fixed_text = "";
function update_console ( text:string, breakline:boolean = true ) {
    fixed_text += text;
    if ( breakline == true ) { fixed_text += "\r\n"; }
    console.clear();
    console.log( fixed_text );
}

// start websocket server
const socket = new WebSocket.Server( { port: parseInt( process.env.SERVERPORT || "" ) } );

const data_file = "data_media.txt";
const range = 200;
var range_data = new Array<number>();

function media ( arr:Array<number> ):number {
    var sum:number = 0;
    arr.forEach( val => { sum += val } );
    return Math.round( sum / arr.length );
}

function add_0( v:number ):string {
    return ( v >= 10 ? v.toString() : "0"+v )
}

const app:express.Application = express();
app.use( '/', express.static( "../game" ) );
app.listen( process.env.PAGEPORT, ():void => {
    console.clear();
    update_console( `Escutando em http://127.0.0.1:${process.env.PAGEPORT}/`.green );
});

// configuração da porta serial
const myPort = new SerialPort( { path: process.env.ARDUINOPORT || "", baudRate: parseInt( <string> process.env.BAUDRATE ), autoOpen: true } );

// On start connect with serial port
myPort.on( 'open', () => {
    update_console( `Conexão Serial iniciada em ${process.env.ARDUINOPORT }`.green );
} );

// On start web-socket connection
socket.on( 'connection', ( socket:WebSocket.WebSocket ) => {
    update_console( "Conexão Com Página iniciada".blue );
    update_console( "-".repeat(30).bgYellow+"\n" );
} );

myPort.on( 'data', ( data:Buffer ) => {
    // socket.send( data.toJSON().data[0] );

    if ( range_data.length < range ) {
        range_data.push( data.toJSON().data[0] );
    } else {
        let date_ob = new Date();
        let med = media( range_data );

        fixed_text = fixed_text.slice( 0, fixed_text.lastIndexOf( '\n' ) );
        fixed_text = fixed_text.slice( 0, fixed_text.lastIndexOf( '\n' ) );

        update_console( "\n > light: "+med.toString(), true );
        update_console( "-".repeat(30).bgYellow, false );

        appendFile( data_file,

            `${ add_0(date_ob.getDate()) }/${
                add_0(date_ob.getMonth()+1) }/${
                date_ob.getFullYear()} ${
                add_0(date_ob.getHours())}:${
                add_0(date_ob.getMinutes())}:${
                add_0(date_ob.getSeconds())} ${
                med }\n`,
            
            (err) => { if (err) { console.log(err); } } );

        range_data = [];
    }
} );