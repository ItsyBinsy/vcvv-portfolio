import { useState, useRef, useEffect } from 'react';
import { MdClose, MdSend, MdChat } from 'react-icons/md';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Vince's AI assistant. I can answer any questions about his skills, projects, or experience! 👋"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage) => {
    try {
      // Get API URL based on environment
      const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1) // Exclude initial greeting
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (err) {
      console.error('Error getting AI response:', err);
      setError('Sorry, I encountered an error. Please try again!');
      return "I apologize, but I'm having trouble connecting right now. You can reach Vince directly at vinceoviana@gmail.com or +63 977 625 1107. 📧";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    // Get AI response
    const aiResponse = await getAIResponse(input);
    
    setMessages(prev => [...prev, { type: 'bot', text: aiResponse }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[32rem] bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 flex flex-col z-40 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-yellow-500 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MdChat className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Vince's Assistant</h3>
                <p className="text-yellow-100 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-600 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <MdClose className="text-white text-xl" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 modal-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 dark:bg-[#2C2C2E] text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-[#2C2C2E] p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-[#2C2C2E] text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <MdSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
