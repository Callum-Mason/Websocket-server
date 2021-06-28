"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var prompt = require("prompt-sync")({ sigint: true });
var ip = "127.0.0.1";
var port = 5757;
var url = "ws://" + ip + ":" + port;
var wss = new ws_1.Server({ port: port });
wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
        messagetobedecoded(message);
    });
    ws.send("");
});
function messagetobedecoded(messageReceived) {
    console.log(messageReceived);
}
function messagetobeencoded(sendmessage) {
    var WebSocket = require("ws");
    var ws = new WebSocket(url);
    console.log(url);
    ws.on("open", function open() {
        ws.send(sendmessage);
    });
}
function messagetobebroadcast(message) {
    var WebSocket = require("ws");
    var wss = new WebSocket(url);
    wss.on("connection", function connection(ws) {
        ws.on("message", function incoming() {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    commands("msg", "Hello World");
                }
            });
        });
    });
}
function consolechat() {
    var message = prompt("> ");
    // console.log(message);
    var command = message.substr(0, message.indexOf(" "));
    var args = message.substr(message.indexOf(" ") + 1);
    commands(command, args);
}
function commands(command, args) {
    if (command == "msg") {
        messagetobeencoded(args);
    }
    else if (command == "broadcast") {
        messagetobebroadcast(args);
    }
    else if (command == "exit") {
        if (args = "0") {
            process.exit(Number(args));
        }
        else if (args = "1") {
            process.exit(Number(args));
        }
        else {
            console.log("please use a valid exit code");
        }
    }
    else {
        console.log("Unknown Command");
    }
    consolechat();
}
console.log(url);
consolechat();
