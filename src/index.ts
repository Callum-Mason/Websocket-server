import { Server } from "ws";

const prompt = require("prompt-sync")({ sigint: true });

const ip = "127.0.0.1";
const port = 5757;
const url = "ws://" + ip + ":" + port;

const wss = new Server({ port: port });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    messagetobedecoded(message);
  });
  ws.send("");
});

function messagetobedecoded(messageReceived: any) {
  console.log(messageReceived);
}

function messagetobeencoded(sendmessage: any) {
  const WebSocket = require("ws");
  const ws = new WebSocket(url);
  console.log(url);
  ws.on("open", function open() {
    ws.send(sendmessage);
  });
}

function messagetobebroadcast(message: any) {
  const WebSocket = require("ws");
  const wss = new WebSocket(url);
  wss.on("connection", function connection(ws: any) {
    ws.on("message", function incoming() {
      wss.clients.forEach(function each(client: any) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
          commands("msg", "Hello World");
        }
      });
    });
  });
}

function consolechat() {
  let message = prompt("> ");
  // console.log(message);
  let command = message.substr(0, message.indexOf(" "));
  let args = message.substr(message.indexOf(" ") + 1);
  commands(command, args);
}

function commands(command: string, args: string) {
  if (command == "msg") {
    messagetobeencoded(args);
  } else if (command == "broadcast") {
    messagetobebroadcast(args);
  } else if (command == "exit") {
    process.exit(Number(args));
  } else {
    console.log("Unknown Command");
  }
  consolechat();
}

console.log(url);

consolechat();
