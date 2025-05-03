const sendBtn = document.getElementById("send-btn");
const msgInput = document.getElementById("msg-input");
const msgArea = document.getElementById("msg-area");

const socket = new WebSocket("ws://localhost:8080");

let count = 0;

btnStatus = false;

let msgContainer;

socket.addEventListener("open" , () => {

    count += 1;
    console.log("connection established !");
    console.log("sending to server !");
    sendBtn.addEventListener("click" , function () {
        
        btnStatus = true;

        socket.send(msgInput.value);

        msgInput.value = "";
        
    });
    
});

let arrData = [];
socket.addEventListener("message" , (e) => {

    arrData.push(e.data);
    let message = e.data;
    let messageElem = document.createElement("p");
    messageElem.textContent = message;
    document.getElementById("msg-space").appendChild(messageElem);
    console.log(`${e.data}`);

});

socket.addEventListener("close" , (e) => {

    if (e.wasClean) {

        console.log(`Connection was closed cleanly, code=${e.code} reason=${e.reason}`);

    } else {

        console.log("Connection is died");

    }

})

socket.addEventListener("error" , (err) => {

    console.log(`${err}`);

});