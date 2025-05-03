const WebSocket = require("ws");

// Instantiation the WebSocket Class !
// Defining the port by passing an object with a key port and it's value
// to the WebSocket method Server() !
const server = new WebSocket.WebSocketServer({ port: 8080 });

let connectionStatus;

let clients = new Map();

// Listening on any connection events to the server using connection event Listener !
server.on("connection" , function (sock) {

    connectionStatus = "New Client Connected !";

    console.log(connectionStatus);

    // Listening on any message events using message event Listener !
    sock.on("message" , function (msg) {

        // msg = `${clients.get(sock)} : ` + msg;

        clients.set(sock , msg);

        // Showing the data !
        console.log(`The data is received : ${msg}`);
        
        // Looping over the connected clients using forEach !
        server.clients.forEach((client) => {

            // If the state of client is connected or the WebSocket is OPEN 
            if (client.readyState === WebSocket.OPEN) {

                // Send the message to the client
                client.send(`${clients.get(sock)} : ${msg}`);
                // client.send(clients.get(sock));

            }
            
        });

    })

    // Closing the socket when the client is disconnected !
    sock.addEventListener("close" , function () {

        console.log("Client Disconnected !");

    });

})

console.log("WebSocket server running on ws://localhost:8080");