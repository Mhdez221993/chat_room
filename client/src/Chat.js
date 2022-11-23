import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chat({username, room, socket}) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (message !== '')  {
      const data = {
        room,
        message,
        author: username,
        date:
          new Date(Date.now()).getHours()
          +':'+
          new Date(Date.now()).getMinutes()

      }

      socket.emit('send_message', data);
      setMessageList((list) => [...list, data]);
      setMessage('')
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className='live-chat'>
      <div className="chat-header">
        <h2>chat room</h2>
      </div>

      <div className="chat-body">
        <ScrollToBottom className='scroll'>
          {
            messageList.map(({author, date, message}, i) => {
              const alingText = author === username ? 'aling-right' : 'aling-left'

              return (
                <div className={alingText} key={i}>
                  <div>
                    <div className="message-content">
                      <p>{message}</p>
                    </div>
                    <div className="message-meta">
                      <p>{author}</p>
                      <p className="author">{date}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ScrollToBottom>
      </div>

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
