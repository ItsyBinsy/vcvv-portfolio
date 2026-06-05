import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { MdClose, MdSend, MdContentCopy, MdCheck, MdRemove } from 'react-icons/md';
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
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    { text: "Skills", query: "What are your technical skills?" },
    { text: "Projects", query: "Tell me about your projects" },
    { text: "Contact", query: "How can I contact you?" },
    { text: "Resume", query: "How do I get your resume?" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        type: 'bot',
        text: "Hi! I'm Vince's AI assistant. Ask me anything about his skills, projects, or experience.",
        timestamp: new Date().toISOString(),
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen, isMinimized]);

  useLayoutEffect(() => {
    if (isOpen && !isMinimized) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isMinimized && messages.length > 0 && messages[messages.length - 1].type === 'bot') {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isMinimized]);

  const getAIResponse = async (userMessage) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });
      if (!response.ok) {
        if (response.status === 429) {
          const err = await response.json();
          setError(err.error || 'Too many messages. Please slow down.');
          return "You're asking fast! Please wait a moment before continuing.";
        }
        const err = await response.json();
        return err.error || "Having trouble connecting. Reach Vince at vincecvviana@gmail.com or +63 938 472 9243.";
      }
      const data = await response.json();
      return data.message;
    } catch (err) {
      setError('Connection error. Please try again.');
      return "Having trouble connecting. You can reach Vince directly via the Contact section or at vincecvviana@gmail.com.";
    }
  };

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;
    if (messageText.length > 500) {
      setError('Message too long. Keep it under 500 characters.');
      setTimeout(() => setError(null), 2000);
      return;
    }
    const now = Date.now();
    if (now - lastMessageTime < 3000) {
      const wait = Math.ceil((3000 - (now - lastMessageTime)) / 1000);
      setError(`Wait ${wait}s before sending again.`);
      setTimeout(() => setError(null), 2000);
      return;
    }
    setLastMessageTime(now);
    setMessages(prev => [...prev, { type: 'user', text: messageText, timestamp: new Date().toISOString() }]);
    setInput('');
    setIsTyping(true);
    setError(null);
    const aiResponse = await getAIResponse(messageText);
    setMessages(prev => [...prev, { type: 'bot', text: aiResponse, timestamp: new Date().toISOString() }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  const confirmClear = () => {
    localStorage.removeItem('chatHistory');
    setMessages([{ type: 'bot', text: "Hi! I'm Vince's AI assistant. Ask me anything about his skills, projects, or experience.", timestamp: new Date().toISOString() }]);
    setShowClearAlert(false);
  };

  const formatTime = (ts) => {
    const d = new Date(ts), now = new Date(), diff = now - d;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Minimized bubble */}
      {isMinimized && (
        <div
          onClick={() => { setIsMinimized(false); setUnreadCount(0); }}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-200 z-40 mb-[env(safe-area-inset-bottom)]"
        >
          <RiRobot2Line className="text-white text-2xl" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              {unreadCount}
            </div>
          )}
        </div>
      )}

      {/* Chat window */}
      {!isMinimized && <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-[22rem] h-[70svh] md:h-[32rem] max-h-[600px] flex flex-col z-40 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-[#0d0d0d]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/6 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 flex-shrink-0">
              <img
                src="/images/baymax.webp"
                alt="Assistant"
                className="w-full h-full object-cover object-top"
                onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
              />
              <div className="w-full h-full bg-yellow-500/10 items-center justify-center hidden">
                <RiRobot2Line className="text-yellow-500 text-sm" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Vince's Assistant</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 2 && (
              <button
                onClick={() => setShowClearAlert(true)}
                className="text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/6 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/6 transition-colors"
            >
              <MdRemove className="text-base" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/6 transition-colors"
            >
              <MdClose className="text-base" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 modal-scrollbar" data-lenis-prevent>
          {messages.map((msg, i) => {
            const isUser = msg.type === 'user';
            const prevMsg = messages[i - 1];
            const nextMsg = messages[i + 1];
            const isFirst = !prevMsg || prevMsg.type !== msg.type;
            const isLast = !nextMsg || nextMsg.type !== msg.type;

            return (
              <div key={i} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'} group`}>
                {/* Bot avatar — only on last bot message in a group */}
                {!isUser && (
                  <div className={`w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ${isLast ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/images/baymax.webp" alt="" className="w-full h-full object-cover object-top" />
                  </div>
                )}

                <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-3 py-2 text-[13px] leading-snug ${
                    isUser
                      ? `bg-yellow-500 text-white ${isFirst && isLast ? 'rounded-2xl' : isFirst ? 'rounded-2xl rounded-br-md' : isLast ? 'rounded-2xl rounded-tr-md rounded-br-sm' : 'rounded-2xl rounded-r-md'}`
                      : `bg-gray-100 dark:bg-[#2C2C2E] text-gray-900 dark:text-white ${isFirst && isLast ? 'rounded-2xl' : isFirst ? 'rounded-2xl rounded-bl-md' : isLast ? 'rounded-2xl rounded-tl-md rounded-bl-sm' : 'rounded-2xl rounded-l-md'}`
                  }`}>
                    {!isUser ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none text-[13px] leading-snug">
                        <ReactMarkdown
                          components={{
                            p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-yellow-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-1" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-1" {...props} />,
                            code: ({ node, inline, ...props }) =>
                              inline
                                ? <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs" {...props} />
                                : <code className="block bg-black/10 dark:bg-white/10 p-2 rounded text-xs overflow-x-auto mt-1" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  {isLast && (
                    <div className={`flex items-center gap-1.5 mt-0.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] text-gray-400 dark:text-gray-600">{formatTime(msg.timestamp)}</span>
                      {!isUser && (
                        <button onClick={() => copyToClipboard(msg.text, i)} className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                          {copiedMessageId === i ? <MdCheck className="text-xs text-green-500" /> : <MdContentCopy className="text-[10px]" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-1.5">
              {quickReplies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(r.query)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-150"
                >
                  {r.text}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-white/6 px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                {[0, 150, 300].map(d => (
                  <div key={d} className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-[11px] text-red-400 text-center px-2">{error}</p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-gray-100 dark:border-white/6 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/8 focus-within:border-yellow-400/50 dark:focus-within:border-yellow-400/30 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              maxLength={500}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none text-sm"
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-7 h-7 rounded-lg bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors duration-150"
            >
              <MdSend className="text-white text-xs" />
            </button>
          </div>
        </div>
      </div>}

      {/* Clear confirm */}
      {showClearAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/8 rounded-2xl shadow-2xl max-w-xs w-full p-6">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Clear chat history?</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowClearAlert(false)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/4 transition-colors">
                Cancel
              </button>
              <button onClick={confirmClear} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-xs font-semibold text-white transition-colors">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
