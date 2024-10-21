import { useState } from 'react';
import axios from 'axios';
import '../Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you with your shopping today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  // New state to control chatbot visibility

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: "user", text: userInput };
        setMessages([...messages, userMessage]);
        setUserInput('');
        setLoading(true);  // Set loading when the API call starts

        // Call Google Gemini API to get the bot's response
        const botResponse = await getBotResponse(userInput);
        setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
        setLoading(false);  // Stop loading once the API call is finished
    };

    const getBotResponse = async (message) => {
        const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        try {
            const response = await axios.post(apiUrl, {
                contents: [{ parts: [{ text: message }] }]
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("API Response:", response.data);
            return response.data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error with Google Gemini API:", error.response ? error.response.data : error.message);
            return "Sorry, I'm having trouble processing your request.";
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {isOpen ? (
                <div className="chatbot-container">
                    <div className="chat-header">
                        <h3>Shopping Assistant</h3>
                        <button onClick={toggleChatbot} className="minimize-btn">-</button>
                    </div>
                    <div className="chat-window">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="message bot">Bot is typing...</div>}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type a message..."
                            disabled={loading}
                        />
                        <button onClick={handleSendMessage} disabled={loading}>Send</button>
                    </div>
                </div>
            ) : (
                <button onClick={toggleChatbot} className="chatbot-icon">
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;
