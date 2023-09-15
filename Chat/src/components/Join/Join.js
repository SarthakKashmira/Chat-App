import React, { useState } from 'react';
import './Join.css';
import logo from '../Images/alexander-shatov-PEJtZfT6C1Q-unsplash.jpg';
import {Link} from 'react-router-dom';


let user;

function Join() {
 const [name, setname] = useState("");

 const senduser=()=>{
  user=name;
  setname("");
}

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='loading' />
        <h1>Chatting App</h1>
        <input onChange={(e)=>setname(e.target.value)} type='text' value={name} placeholder='Enter Your Name' id='JoinInput'/>
        <Link onClick={(event)=>!name?event.preventDefault():null} to='/chat'><button onClick={senduser} id='JoinBtn'>Login</button></Link>
      </div>
      
    </div>
  );
}
export default Join;
export {user};

