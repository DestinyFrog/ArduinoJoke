"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importaçoes
const serialport_1 = require("serialport");
const express_1 = __importDefault(require("express"));
const WebSocket = __importStar(require("ws"));
const colors = __importStar(require("colors"));
const dotenv = __importStar(require("dotenv"));
const fs_1 = require("fs");
dotenv.config();
colors.enable();
var fixed_text = "";
function update_console(text, breakline = true) {
    fixed_text += text;
    if (breakline == true) {
        fixed_text += "\r\n";
    }
    console.clear();
    console.log(fixed_text);
}
// start websocket server
const socket = new WebSocket.Server({ port: parseInt(process.env.SERVERPORT || "") });
const data_file = "data_media.txt";
const range = 200;
var range_data = new Array();
function media(arr) {
    var sum = 0;
    arr.forEach(val => { sum += val; });
    return Math.round(sum / arr.length);
}
function add_0(v) {
    return (v >= 10 ? v.toString() : "0" + v);
}
const app = (0, express_1.default)();
app.use('/', express_1.default.static("../game"));
app.listen(process.env.PAGEPORT, () => {
    console.clear();
    update_console(`Escutando em http://127.0.0.1:${process.env.PAGEPORT}/`.green);
});
// configuração da porta serial
const myPort = new serialport_1.SerialPort({ path: process.env.ARDUINOPORT || "", baudRate: parseInt(process.env.BAUDRATE), autoOpen: true });
// On start connect with serial port
myPort.on('open', () => {
    update_console(`Conexão Serial iniciada em ${process.env.ARDUINOPORT}`.green);
});
// On start web-socket connection
socket.on('connection', (socket) => {
    update_console("Conexão Com Página iniciada".blue);
    update_console("-".repeat(30).bgYellow + "\n");
});
myPort.on('data', (data) => {
    // socket.send( data.toJSON().data[0] );
    if (range_data.length < range) {
        range_data.push(data.toJSON().data[0]);
    }
    else {
        let date_ob = new Date();
        let med = media(range_data);
        fixed_text = fixed_text.slice(0, fixed_text.lastIndexOf('\n'));
        fixed_text = fixed_text.slice(0, fixed_text.lastIndexOf('\n'));
        update_console("\n > light: " + med.toString(), true);
        update_console("-".repeat(30).bgYellow, false);
        (0, fs_1.appendFile)(data_file, `${add_0(date_ob.getDate())}/${add_0(date_ob.getMonth() + 1)}/${date_ob.getFullYear()} ${add_0(date_ob.getHours())}:${add_0(date_ob.getMinutes())}:${add_0(date_ob.getSeconds())} ${med}\n`, (err) => { if (err) {
            console.log(err);
        } });
        range_data = [];
    }
});
