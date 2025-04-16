import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './chatbox.css';

const socket = io('http://localhost:3001');

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const username = JSON.parse(localStorage.getItem('user'))?.name || 'Guest';
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('chatMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const message = {
      username,
      content,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit('chatMessage', message);
    setContent('');
  };

  return (
    <div className="chatbox-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className="chat-message">
            <strong>{msg.username}</strong>: {msg.content}
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
