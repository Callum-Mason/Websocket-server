import { Server } from "ws";

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ip = "127.0.0.1";

const port = 5757

const url = "ws://" + ip + ":" + port;


const wss = new Server({ port: port });

  wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      // console.log("received: %s", message);
      messagetobedecoded(message);
    }
    );

    // Send a message to the client on connection

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
  // console.log(url);
wss.on("connection", function connection(ws: any) {
  ws.on("message", function incoming() {
    wss.clients.forEach(function each(client: any) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

}




(async () => {
  // const url = await connect(5757);
  // console.log(url);
  console.log(url);

  rl.question("What is your name ? ", function saveInput(name: any) {
    console.log(`His name is ${name}`);
    messagetobeencoded("hello World");

    messagetobebroadcast(name);
    rl.close();
  });

  

  


  
})();

