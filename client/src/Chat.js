import { useState } from "react";

export default function Chat({username, room, socket}) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '')  {
      const data = {
        username,
        room,
        message,
      }

      socket.emit('send_message', data);
      setMessage('')
    }
  }

  return (
    <div className='live-chat'>
      <div className="chat-header">
        <h2>chat room</h2>
      </div>

      <div className="chat-body"></div>

      <div className="chat-footer">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='chat-input'
          type="text"
        />

        <button
          className='chat-send'
          onClick={sendMessage}
        >&#9658;</button>
      </div>
    </div>
  );
}
