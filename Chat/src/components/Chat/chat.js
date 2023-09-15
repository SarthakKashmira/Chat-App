import React, { useEffect, useState } from 'react';
import {user} from '../Join/Join.js';
import socketIO from 'socket.io-client';
import './chat.css';
import pic from '../Images/send.png';
import Message from '../Message/Message.js'
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT="http://localhost:5500/";
const socket=socketIO(ENDPOINT,{transports:['websocket']});

function Chat() {
  const [id, setid] = useState("");
  const [message,setmessage]=useState("");
  const [messages,setmessages] = useState([]);
  
  
  const Send=()=>{ 
    console.log(message);
    socket.emit("message",{message,id});
    setmessage("");
    
  }
  
 console.log(messages);
  useEffect(()=>{
       //it is declared inside because it renders twice the message outside
    socket.on("connect",()=>{
      console.log("Ho gya bhai connect");
    })

    socket.emit("joined",{user})

    socket.on("userjoined",(data)=>{
      setmessages([...messages,data]);
     console.log(data.user,data.message);
   })

    socket.on("welcome",(data)=>{
      setmessages([...messages,data]);
      setid(data.id);
    })

    socket.on("leave",(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message,data.id);
    })
    return ()=>{
          socket.emit("disconnected");
          socket.off();
    }
   },[])


   useEffect(() => { 
      socket.on("sendmessage",(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.messageforward,data.id);
      })
      return ()=>{
        socket.off();
      }
    }, [messages])
    

  return (
    <div className='chatPage'>
       <div className='chatContainer'>
        <div className='header'>
          <div className='text'>
            <div>Enjoy With Your Friends!!</div>
          </div>
        </div>
          <ReactScrollToBottom className='chatBox'>
           {messages.map((item,i)=><Message user={  item.id===id && item.user!=='Admin' ? null : item.user} message={item.message} classs={item.id===id?'right':'left'}/> )}
          </ReactScrollToBottom >
          <div className='inputBox'>
            <input type='text' id='chatInput' onKeyPress={(event)=>event.key==='Enter'? Send():null} value={message} onChange={(e)=>setmessage(e.target.value)}/>
            <button className='sendBtn' onClick={Send}><img src={pic} alt='Send'/></button>
          </div>
        
       </div>
    </div>
  )                                                  
}

export default Chat;