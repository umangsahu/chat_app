const socket=io();
let username;
let msg;
do{
    username=prompt('enter your name');
 

}while(!username)






const form=document.getElementById("send-container");
const messageInput=document.getElementById('messageInput')
const messagecontainer=document.getElementById('container')
form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevent to reload th page
msg=messageInput.value;
sendMessage(msg);

})
function sendMessage(msg){
let Message={
    user:username,
    message:msg.trim()
}
//append mssage
appendMessage(Message,'mymessage');

//send to server via web socket
socket.emit('message',Message)

}
function appendMessage(msg,type){
    let mainDIv=document.createElement('div');
    let classname=type;
    mainDIv.classList.add(classname,'textArea');
    let markup=`
    <strong class="name">${msg.user}</strong>
    <span class="text-message">
        ${msg.message}
    </span>
    `
    mainDIv.innerHTML=markup;
    messagecontainer.appendChild(mainDIv);
}//receive the message
socket.on('message',(msg)=>{
   
            appendMessage(msg,"othermessage");
        

})

//when new user joined
socket.on('new-user',username=>{
    let Message={
        user:"newuser",
        message:`${username} joined the chat`
    }
    
    appendMessage(Message,"othermessage")
})