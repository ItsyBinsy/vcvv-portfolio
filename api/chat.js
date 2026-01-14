// Vercel Serverless Function - OpenAI Chatbot API
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
- Bachelor of Science in Information Technology graduate from University of Santo Tomas
- Specializes in Web & Mobile Development
- Full-Stack Developer with 19+ technical skills

**Technical Skills:**
Frontend:
- ReactJS, AngularJS, Vue.js
- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS, Bootstrap

Backend:
- Laravel, PHP
- Node.js, Express.js
- REST API development

Mobile:
- Android Studio (Java/Kotlin)
- React Native

Databases:
- MySQL, PostgreSQL
- MongoDB, Firebase

DevOps & Tools:
- Git, GitHub, GitLab
- Docker
- Postman, VS Code

Design:
- Figma, Adobe XD, Photoshop

**Featured Projects:**

1. **Barangay 24/7** - Digital Barangay Management Platform
   - Role-based access control system
   - Household & resident registration management
   - Tech Stack: Laravel, Bootstrap, MySQL
   - Role: Full-Stack Developer

2. **StudAI** - AI-Powered Study Assistant
   - AI chat integration with Gemini API
   - Study planning and gamification features
   - Real-time quiz battles
   - Tech Stack: React, Firebase, Tailwind CSS
   - Role: Full-Stack Developer

3. **Livelihood & Vocation Ventures** - E-commerce Platform
   - Product catalog and shopping cart
   - User authentication and admin panel
   - Tech Stack: Laravel, MySQL
   - Role: Full-Stack Developer

4. **Experience MiMaRoPa** - Tourist Booking Platform
   - Hotel and tour booking system
   - Responsive design for mobile users
   - Tech Stack: Laravel, Livewire, Tailwind CSS
   - Role: Frontend Developer

5. **Star Colo Roofing** - Construction Company Website
   - Modern, professional landing page
   - Mobile-responsive design
   - Tech Stack: WordPress
   - Role: Frontend Developer

**Certifications:**
- Cisco JavaScript Essentials 1 (Cisco Networking Academy)
- CompTIA IT Fundamentals (CompTIA)
- PhilNITS Fundamentals of Information Technology (FE) (PhilNITS Philippines)
- Multiple DICT Digital Skills Certifications

**Contact Information:**
- Email: vincecvviana@gmail.com
- Phone: +63 938 472 9243
- LinkedIn, GitHub, Facebook profiles available

**Education:**
- Bachelor of Science in Information Technology
- University of Santo Tomas (UST)
- Specialization: Web & Mobile Development

**Work Status:**
- Open to full-time positions, freelance projects, and contract work
- Available for remote opportunities
- Interested in web/mobile development roles

**Communication Style:**
- Be professional yet friendly
- Use emojis sparingly (1-2 per response max)
- Keep responses concise but informative
- If asked about pricing/rates, mention it varies by project scope and suggest contacting directly
- For detailed CV/portfolio info, mention they can download the CV from the portfolio
- Always encourage visitors to reach out via email or phone for serious inquiries

**Guidelines:**
- Answer questions accurately based on the information above
- If asked something not covered, politely say you can help with skills, projects, contact info, etc.
- Maintain a helpful, professional tone
- Don't make up information not provided above
- For complex technical discussions, suggest contacting Vince directly`;

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
