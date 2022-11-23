import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setSRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
    }
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
