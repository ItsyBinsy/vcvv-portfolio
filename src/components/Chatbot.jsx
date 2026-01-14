import { useState, useRef, useEffect } from 'react';
import { MdClose, MdSend, MdMinimize, MdContentCopy, MdCheck } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showClearAlert, setShowClearAlert] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Quick reply suggestions
  const quickReplies = [
    { text: "View Skills", query: "What are your technical skills?" },
    { text: "See Projects", query: "Tell me about your projects" },
    { text: "Contact Info", query: "How can I contact you?" },
    { text: "Download CV", query: "How do I get your CV?" }
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial greeting
      setMessages([
        {
          type: 'bot',
          text: "Hi! I'm Vince's AI assistant. I can answer any questions about his skills, projects, or experience! 👋\n\nTry asking me anything, or click a suggestion below:",
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Track unread messages when minimized
  useEffect(() => {
    if (isMinimized && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isMinimized]);

  // Play notification sound
  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKnn77ZiGwU7k9n0yXYpBSh+zPLaizsKFlyw6OqlUxELSKXh8bllHAU2jdXzzn0vBSaAzvDajDwLGGy9 7+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGwU9l9v0xXIoBSh/zfDajTwKFl606OijUBELSaXi8bllHAU2jdXzzn0vBSaAzvDajDwLGGy97+SaSwwNU6vm8LBfGw==');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore errors if autoplay is blocked
  };

  const getAIResponse = async (userMessage) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.type !== 'quickReply') // Exclude quick reply UI from history
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
      return "I apologize, but I'm having trouble connecting right now. You can reach Vince directly at vincecvviana@gmail.com or +63 938 472 9243. 📧";
    }
  };

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { 
      type: 'user', 
      text: messageText,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    // Get AI response
    const aiResponse = await getAIResponse(messageText);
    
    const botMessage = { 
      type: 'bot', 
      text: aiResponse,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
    
    // Play notification sound if minimized
    if (isMinimized) {
      playNotificationSound();
    }
  };

  const handleQuickReply = (query) => {
    handleSend(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  const clearHistory = () => {
    setShowClearAlert(true);
  };

  const confirmClearHistory = () => {
    localStorage.removeItem('chatHistory');
    setMessages([
      {
        type: 'bot',
        text: "Hi! I'm Vince's AI assistant. I can answer any questions about his skills, projects, or experience! 👋\n\nTry asking me anything, or click a suggestion below:",
        timestamp: new Date().toISOString()
      }
    ]);
    setShowClearAlert(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Minimized Chat Bubble */}
      {isOpen && isMinimized && (
        <div 
          onClick={handleMaximize}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-16 h-16 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 z-40 animate-bounce"
        >
          <RiRobot2Line className="text-white text-2xl" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {unreadCount}
            </div>
          )}
        </div>
      )}

      {/* Full Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[32rem] bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 flex flex-col z-40 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-yellow-500 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/baymax.jpg" 
                  alt="Vince's AI Assistant" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <RiRobot2Line className="text-yellow-500 text-xl hidden" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Vince's AI Assistant</h3>
                <p className="text-yellow-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online 24/7
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMinimize}
                className="p-2 hover:bg-yellow-600 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Minimize chat"
                title="Minimize"
              >
                <MdMinimize className="text-white text-xl" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-yellow-600 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Close chat"
                title="Close"
              >
                <MdClose className="text-white text-xl" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 modal-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : ''}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 dark:bg-[#2C2C2E] text-gray-900 dark:text-white'
                    }`}
                  >
                    {msg.type === 'bot' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({node, ...props}) => <a className="text-yellow-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? 
                                <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props} /> :
                                <code className="block bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto" {...props} />
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                    {msg.type === 'bot' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, index)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Copy message"
                      >
                        {copiedMessageId === index ? (
                          <MdCheck className="text-sm text-green-500" />
                        ) : (
                          <MdContentCopy className="text-xs" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Reply Buttons - Show only after initial message */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.query)}
                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-full transition-all duration-200 hover:scale-105"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

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
            {messages.length > 2 && (
              <button
                onClick={clearHistory}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-2 transition-colors"
              >
                Clear history
              </button>
            )}
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
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <MdSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Chat Alert Modal */}
      {showClearAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10001] p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scaleIn">
            {/* Alert Header */}
            <div className="p-6 pb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Clear Chat History?
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                This will permanently delete all messages in your conversation. This action cannot be undone.
              </p>
            </div>

            {/* Alert Actions */}
            <div className="flex flex-col gap-0 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={confirmClearHistory}
                className="py-3.5 px-6 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-b border-gray-200 dark:border-gray-700"
              >
                Clear History
              </button>
              <button
                onClick={() => setShowClearAlert(false)}
                className="py-3.5 px-6 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
