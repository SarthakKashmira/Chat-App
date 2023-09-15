const http=require('http');
const express=require('express');
const cors=require('cors');
const socketIO=require('socket.io');
const app=express();

const port=5500 || process.env.PORT;

const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL IT is working");
})

const server=http.createServer(app);
const io=socketIO(server);


io.on("connection",(socket)=>{
    console.log("New connection");

    socket.on("joined",({user})=>{
       users[socket.id]=user;      
       socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has Joined`,id:socket.id})  //to send message to everybody other than the person who joined
       socket.emit("welcome",{user:"Admin",message:`Welcome to the chat ${users[socket.id]}`,id:socket.id}) //to send message whenever a person joins the chat to himself
    })
     socket.on("message",({message,id})=>{
        console.log(id);
        io.emit("sendmessage",{user:users[id] ,message,id})
     })
    socket.on("disconnected",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has left`,id:socket.id});// socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
        console.log(`User Left`);
    })
});
                
    
server.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`);
})