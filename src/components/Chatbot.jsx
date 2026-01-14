import { useState, useRef, useEffect } from 'react';
import { MdClose, MdSend, MdChat } from 'react-icons/md';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Vince's portfolio assistant. Ask me about his skills, projects, or experience! 👋"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();

    // Skills questions
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('tech') || lowerQuestion.includes('know')) {
      if (lowerQuestion.includes('react')) {
        return "Yes! Vince is proficient in ReactJS. He's developed component-based interfaces with state management, applied in portfolio features, client projects, and coursework. You can see it in action in projects like StudAI and Star Coloroof! 🚀";
      }
      if (lowerQuestion.includes('backend') || lowerQuestion.includes('node') || lowerQuestion.includes('laravel')) {
        return "Vince has strong backend skills! He's experienced with Node.js, Express.js, Laravel, and ASP.NET. He's built scalable APIs and full-featured web applications using these technologies. 💪";
      }
      return `Vince has 19+ technical skills including:\n\n**Frontend:** ReactJS, AngularJS, HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap\n**Backend:** Node.js, Express.js, Laravel, ASP.NET\n**Mobile:** Android Studio, Kotlin\n**Database:** MySQL\n**Tools:** Git, GitHub, Figma, Photoshop\n\nWant to know more about any specific skill? 🛠️`;
    }

    // Projects questions
    if (lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('built')) {
      if (lowerQuestion.includes('studai')) {
        return "StudAI is Vince's AI-Powered Study Companion! Built with ReactJS, Laravel, and Firebase, it features:\n\n• Quiz modules with 3 game modes\n• Real-time multiplayer quiz battles\n• AI-powered study recommendations\n• Achievement systems & progress tracking\n\nIt's deployed on Digital Ocean with GitHub for version control. Pretty impressive, right? 🎓";
      }
      if (lowerQuestion.includes('coloroof') || lowerQuestion.includes('star')) {
        return "Star Coloroof is a Roofing Products E-Commerce Platform! Vince built it using ReactJS, Tailwind CSS, and Node.js. It includes:\n\n• Online storefront with product catalog\n• Shopping cart functionality\n• Booking system\n• Customer inquiry features\n\nA complete e-commerce solution! 🏠";
      }
      return `Vince has worked on 7 impressive projects:\n\n1. **StudAI** - AI-Powered Study Companion\n2. **Star Coloroof** - E-Commerce Platform\n3. **ExperienceMIMAROPA** - Tourism Platform\n4. **FAST Payroll** - Automated Payroll System\n5. **Barangay 24/7** - Digital Management Platform\n6. **Viva La Vigan** - Tourism & Cultural Heritage\n7. **Mobile App Collection** - Netflix, Instagram & Maya inspired\n\nWant to know more about any specific project? 📱`;
    }

    // Certifications
    if (lowerQuestion.includes('cert') || lowerQuestion.includes('achieve')) {
      return "Vince has earned the **PhilNITS Information Technology Passport (IP) Certification** in November 2025! This demonstrates his solid foundation in IT fundamentals and professional competence. 🏆";
    }

    // Contact questions
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach')) {
      return "You can reach Vince at:\n\n📧 **Email:** vincecvviana@gmail.com\n📱 **Phone:** +63 995 085 1003\n🔗 **LinkedIn:** linkedin.com/in/vincecvv\n👤 **Facebook:** facebook.com/vincecvv\n\nFeel free to connect! 💬";
    }

    // Education
    if (lowerQuestion.includes('education') || lowerQuestion.includes('study') || lowerQuestion.includes('school') || lowerQuestion.includes('university')) {
      return "Vince is pursuing a **Bachelor of Science in Information Technology** at the **University of Santo Tomas**. He's specializing in Web and Mobile App Development! 🎓";
    }

    // Experience/Role
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('developer') || lowerQuestion.includes('role')) {
      return "Vince is a **Full-Stack Developer** and **Student Developer**! He's also worked as a **Social Media Manager**. He has hands-on experience building complete web and mobile applications from frontend to backend. 💻";
    }

    // Default response
    return "I can help you learn about:\n\n• Vince's **skills** and technologies\n• His **projects** and work experience\n• **Certifications** and achievements\n• How to **contact** him\n• His **education** background\n\nWhat would you like to know? 🤔";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findAnswer(input);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
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
