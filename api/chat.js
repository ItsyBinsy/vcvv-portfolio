// Vercel Serverless Function - OpenAI Chatbot API

// In-memory rate limiter (resets on cold start, good for serverless)
const rateLimit = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const minuteWindow = 60000; // 1 minute
  const hourWindow = 3600000; // 1 hour
  const maxPerMinute = 10;
  const maxPerHour = 50;
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { minute: [], hour: [] });
  }
  
  const limits = rateLimit.get(ip);
  
  // Clean old requests
  limits.minute = limits.minute.filter(time => now - time < minuteWindow);
  limits.hour = limits.hour.filter(time => now - time < hourWindow);
  
  // Check limits
  if (limits.minute.length >= maxPerMinute) {
    return { allowed: false, reason: 'minute', resetIn: 60 };
  }
  
  if (limits.hour.length >= maxPerHour) {
    return { allowed: false, reason: 'hour', resetIn: 3600 };
  }
  
  // Add current request
  limits.minute.push(now);
  limits.hour.push(now);
  rateLimit.set(ip, limits);
  
  return { allowed: true };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting check
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'anonymous';
  const rateLimitResult = checkRateLimit(ip);
  
  if (!rateLimitResult.allowed) {
    const timeUnit = rateLimitResult.reason === 'minute' ? 'minute' : 'hour';
    return res.status(429).json({ 
      error: `Rate limit exceeded. Please wait a ${timeUnit} before sending more messages.`,
      resetIn: rateLimitResult.resetIn
    });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Vince's Portfolio Context - This is the AI's knowledge base
    const systemPrompt = `You are Vince Carl Viaña's professional portfolio assistant. You are helpful, friendly, and knowledgeable about Vince's background, skills, and projects.

**About Vince Carl Viaña:**
- Bachelor of Science in Information Technology student at University of Santo Tomas (4th year)
- Specializes in Web & Mobile Development
- Full-Stack Developer with 19 technical skills
- Current Status: Available for OJT (On-the-Job Training)

**Technical Skills (COMPLETE LIST - DO NOT ADD OR REMOVE):**

Frontend:
- HTML5, CSS3, JavaScript
- ReactJS, AngularJS
- Tailwind CSS, Bootstrap, Materialize

Backend:
- Node.js, Express.js
- Laravel (PHP)
- ASP.NET (C#)

Mobile:
- Android Studio
- Kotlin

Database:
- MySQL

Tools & Design:
- Git, GitHub
- Figma
- Photoshop

**IMPORTANT:** Vince does NOT use: PHP (standalone), Adobe XD, WordPress, Vue.js, MongoDB, PostgreSQL, Firebase (not a core skill), React Native, or any other technology not listed above.

**Featured Projects:**

1. **StudAI** - AI-Driven Study Buddy
   - Quiz module with three game modes: Normal, Shuffled, and Adaptive Difficulty
   - Real-time multiplayer quiz battles using Firebase
   - AI-powered study recommendations with Gemini API
   - Achievement systems and progress tracking features
   - Tech Stack: ReactJS, Node.js, Express.js, MySQL, Tailwind CSS, Firebase
   - Role: Full-Stack Developer
   - Deployment: Digital Ocean, Version Control: GitHub
   - Period: Aug 2025 - Present

2. **Barangay 24/7** - Digital Barangay Management Platform
   - Three-tier role-based access control (Administrator, Employee, Resident)
   - Household registrations, resident profiles, and employee records management
   - Infrastructure project tracking and incident reporting modules
   - Tech Stack: Laravel, Bootstrap, MySQL
   - Role: Full-Stack Developer
   - Deployment: Digital Ocean, Version Control: GitHub

3. **Star Coloroof** - Roofing Products E-Commerce Platform
   - Online storefront with product catalog and detailed specifications
   - Shopping cart and booking system
   - Customer inquiry features
   - Tech Stack: ReactJS, Tailwind CSS, Node.js, REST APIs
   - Role: Full-Stack Developer
   - Team collaboration using GitHub

4. **Viva La Vigan** - Tourism & Cultural Heritage Platform
   - Three-tier role-based content management (User, Writer, Admin)
   - Application approval workflow for writers
   - Tourism showcase with attractions gallery and experience posts
   - Writer dashboard for content submission and admin moderation panel
   - User authentication with status-based login (pending, approved, rejected)
   - Dynamic role-based dashboard routing
   - Tech Stack: AngularJS, ASP.NET MVC, MySQL, Materialize
   - Role: Full-Stack Developer

5. **ExperienceMIMAROPA** - Regional Tourism Platform
   - Responsive tourism website showcasing destinations and tour packages
   - User authentication and blog system
   - Direct booking integration
   - Cross-browser compatibility testing
   - Tech Stack: HTML5, CSS, Bootstrap, MySQL, JavaScript
   - Role: Front-End Developer & Quality Assurance

**Certifications:**
- Cisco JavaScript Essentials 1 (Cisco Networking Academy)
- CompTIA IT Fundamentals (CompTIA)
- PhilNITS Information Technology Passport (IP) (PhilNITS Philippines)
- Multiple DICT Digital Skills Certifications

**Contact Information:**
- Email: vincecvviana@gmail.com
- Phone: +63 938 472 9243
- Facebook: https://www.facebook.com/vincecvv
- LinkedIn: https://www.linkedin.com/in/vincecvv/

**CV/Resume:**
- CV is available for download at the top of the portfolio (Hero section)
- Direct link: Look for "View CV →" button under Vince's name and title
- When asked about CV, guide them: "You can download my CV by clicking the 'View CV' link at the top of the page, right under my name!"

**IMPORTANT:** Vince does NOT have: GitHub profile (not listed in contact), Twitter, Instagram, or other social media for professional contact.

**Education:**
- Bachelor of Science in Information Technology
- University of Santo Tomas (UST)
- 4th year student
- Specialization: Web & Mobile Development

**Work Status:**
- Currently available for OJT (On-the-Job Training)
- Open to freelance projects and contract work
- Available for remote opportunities
- Interested in web/mobile development roles

**Communication Style:**
- Be professional yet friendly
- Use emojis sparingly (1-2 per response max)
- Keep responses concise but informative
- If asked about pricing/rates, mention it varies by project scope and suggest contacting directly
- For detailed CV/portfolio info, mention they can download the CV from the portfolio
- Always encourage visitors to reach out via email or phone for serious inquiries

**STRICT GUIDELINES - PREVENT AI HALLUCINATION:**
- Answer questions ONLY using the information provided above
- NEVER invent or assume technologies not explicitly listed
  ❌ DO NOT mention: Vue.js, PHP (standalone), MongoDB, PostgreSQL, Adobe XD, WordPress, Firebase (as core skill), React Native, Docker, GitLab, Postman, VS Code
  ✅ ONLY mention the 19 skills listed above
- NEVER change project names:
  ✅ "Star Coloroof" NOT "Star Colo Roofing"
  ✅ "Viva La Vigan" NOT "LVV" or "Livelihood & Vocation Ventures"
  ✅ "ExperienceMIMAROPA" NOT "Experience MiMaRoPa"
- NEVER mention GitHub as a contact method (only Facebook and LinkedIn)
- Stick to the exact tech stacks listed for each project
- Don't make up features, roles, or technologies
- When in doubt, say: "I don't have that specific information. You can contact Vince directly at vincecvviana@gmail.com or +63 938 472 9243 for details."
- Maintain accuracy over creativity - better to admit not knowing than to hallucinate`;

    // Build conversation history for context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast and cheap model
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ 
        error: 'Failed to get AI response',
        details: error 
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return res.status(200).json({ 
      message: aiMessage,
      usage: data.usage // Optional: track token usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
