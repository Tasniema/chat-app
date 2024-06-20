import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './App.css';
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if(currentMessage !== ""){
      const messagesData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      }

     await socket.emit("send_message", messagesData);
     setMessageList((list) => [...list, messagesData]);
     setCurrentMessage("");
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <h4>Live chat</h4>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
         {messageList.map((content) => {
            return ( <div key={content.id} className="message"
                        id={username=== content.author ? "you" : "other"}>
                      <div>
                          <div className="message-content">
                              <p>{content.message}</p>
                          </div>
                          <div className='message-meta'>
                             <p id="time">{content.time}</p>
                             <p id="author">{content.author}</p>
                          </div>
                    </div>
            </div>
            );
          })}
           </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input 
        type="text" 
        value={currentMessage}
        placeholder="Hey.." 
        onChange={(e) => setCurrentMessage(e.target.value) }
        onKeyPress={(e) => { e.key === 'Enter' && sendMessage() }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;
