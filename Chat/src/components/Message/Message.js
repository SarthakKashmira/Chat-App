import React from 'react'
import './Message.css'
function Message({user,message,classs}) {
    if(user)
    { return (
        <div className={`messagebox ${classs}`}>
            {`${user} : ${message}`}
        </div>
      )
    }
    else{
  return (
    <div className={`messagebox ${classs}`}>
        {`You : ${message}`}
    </div>
  )
    }
}

export default Message