//node server
const express=require('express');
const app=express();
const http=require('http').createServer(app);
const PORT=process.env.PORT||3000;

http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
app.use(express.static(__dirname+"/public"))//middle ware for getting css file and others file
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
 
})

//socket
const io=require("socket.io")(http);
io.on('connection',socket=>{

    socket.on('user-joined',username=>{
        
        socket.brodcast.emit('new-user',username)

    })
    socket.on('message',(msg)=>{
socket.broadcast.emit('message',msg)


    })
   
})