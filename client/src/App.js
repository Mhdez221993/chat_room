import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setSRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setJoined(true);
    }
  }

  return (
    <div className="App">
      { !joined ?

        <div className="join-room-wrapper">
        <h1>LIVE CHAT</h1>
        <input
          value={username}
          className='join-input'
          type="text"
          placeholder='username...'
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          value={room}
          className='join-input'
          type="text"
          placeholder='room...'
          onChange={(e) => setSRoom(e.target.value)}
        />

        <button
          className='join-button'
          onClick={joinRoom}
        >
          Join room</button>
      </div>

      :
        <Chat room={room} username={username} />
      }

    </div>
  );
}

export default App;
