export default function Chat({username, room}) {
  return (
    <div className='live-chat'>
      <div className="chat-header">
        <h2>chat room</h2>
      </div>

      <div className="chat-body"></div>

      <div className="chat-footer">
        <input className='chat-input' type="text" />
        <button className='chat-send'>&#9658;</button>
      </div>
    </div>
  );
}
