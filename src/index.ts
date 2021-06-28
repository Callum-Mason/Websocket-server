import { Server } from "ws";

const ip = "127.0.0.1";

const port = 5757


const wss = new Server({ port: port });

  wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      // console.log("received: %s", message);
      messagetobedecoded(message);
    }
    );

    // Send a message to the client on connection

    ws.send("Connected...");
  });



function messagetobedecoded(messageReceived: any) {
  console.log(messageReceived);

  // messagetobeencoded(messageReceived);
}

// function messagetobeencoded(sendmessage: any) {
//   const ws = new WebSocket("ws://"+ip+port);
  
//   ws.send(sendmessage)

// }





(async () => {
  // const url = await connect(5757);
  // console.log(url);
  console.log("ws://" + ip + port);
})();
