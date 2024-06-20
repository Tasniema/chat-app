import { useState }from 'react';
import io from "socket.io-client";
import Chat from './Chat';
import './App.css';

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername ] = useState("");
  const [room, setRoom ] = useState("");
  const [showChat, setShowChat] = useState(false);

   const joinRoom = () => {
      if(username !== "" && room !== ""){
        socket.emit("join_room", room);

        setShowChat(true);
      }
   }

  return (
    <div className="App"> 
    { !showChat ? (
    <div className='joinChatContainer'>
      <h3>Join Chat Room</h3>
      <input 
      type="text" 
      placeholder="John..." 
      onChange={(e) => setUsername(e.target.value) } />
        <input 
        type="text" 
        placeholder="RoomId" 
       onChange={(e) => setRoom(e.target.value) }/>
      <button onClick={joinRoom}>Join Room</button>

      </div>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
    </div>
  );
}

export default App;
