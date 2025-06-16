import React, { useState } from 'react';

function CompanionBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mood, setMood] = useState('neutral');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: 'user', text: input, mood }]);
        setInput('');
        // Simulate bot response based on mood
        setMessages(msgs => [
            ...msgs,
            { from: 'bot', text: `Bot (${mood}): I'm responding to "${input}"!`, mood }
        ]);
    };

    return (
        <div className="bot-window">
            <div>
                <label>Mood: </label>
                <select value={mood} onChange={e => setMood(e.target.value)}>
                    <option value="happy">Happy</option>
                    <option value="motivated">Motivated</option>
                    <option value="calm">Calm</option>
                    <option value="neutral">Neutral</option>
                </select>
            </div>
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.from}>
                        <strong>{msg.from}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-bar">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default CompanionBot;
