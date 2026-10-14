/**
 * ==============================================================================
 * ISHA SHARMA - PORTFOLIO CONFIGURATION
 * ==============================================================================
 * 
 * Welcome to your portfolio configuration file!
 * You can edit all your personal details, links, and text right here.
 * Any changes made here will automatically reflect across your entire website.
 * 
 * Simply update the values inside the quotes ("...") and save the file.
 * ==============================================================================
 */

const PORTFOLIO_CONFIG = {
  // --- Personal Information ---
  personal: {
    fullName: "Isha Sharma",
    shortName: "Isha",
    title: "1st Year Civil Engineering Student & AI Generalist",
    location: "Jaipur, Rajasthan, India",
    university: "JECRC University, Jaipur",
    universityYear: "1st Year (B.Tech in Civil Engineering)",
    school: "Rukmani Birla Modern High School, Jaipur",
    
    // Contact Information (Replace placeholders with your real details)
    phone: ".........",             // e.g. "+91 98765 43210"
    phoneHref: "tel:+919876543210", // When clicked, opens phone dialer
    
    linkedin: "........",           // e.g. "https://www.linkedin.com/in/isha-sharma"
    linkedinHref: "https://www.linkedin.com/", 
    
    email: "isha.sharma@example.com", // e.g. "isha.sharma@gmail.com"
    emailHref: "mailto:isha.sharma@example.com",
    
    statusBadge: "Available for Projects & Tech Collaborations",
  },

  // --- Home Page Intro (Two-line clean impact intro) ---
  home: {
    badge: "👋 Welcome to my digital portfolio",
    greeting: "Hi, I'm",
    name: "Isha Sharma",
    // Two-line intro as requested:
    introLine1: "First-year Civil Engineering student at JECRC University, Jaipur.",
    introLine2: "Passionate Prompt Engineer & AI Generalist bridging foundational engineering with intelligent technology.",
    
    quickHighlights: [
      { icon: "🏛️", label: "JECRC University", subtext: "Civil Engineering '26" },
      { icon: "📍", label: "Jaipur, India", subtext: "The Pink City" },
      { icon: "⚡", label: "Prompt Engineering", subtext: "LLM & AI Workflows" },
      { icon: "📖", label: "Avid Reader", subtext: "Continuous Learner" }
    ]
  },

  // --- About Page: Story, Hobbies & Education ---
  about: {
    heading: "My Story, Hobbies & Education",
    subtitle: "A glimpse into my background, academic path, and personal passions.",
    
    story: [
      "Hello! I am Isha Sharma, an aspiring engineer and creative technologist based in the historic and vibrant city of Jaipur, Rajasthan. My educational roots began at Rukmani Birla Modern High School, where I cultivated a deep appreciation for disciplined thinking, academic rigor, and creative problem-solving.",
      "Currently, I am in my first year pursuing a Bachelor of Technology in Civil Engineering at JECRC University, Jaipur. While civil engineering trains my spatial reasoning, analytical calculations, and understanding of the built world, I am equally passionate about the future of digital intelligence.",
      "As an AI Generalist and Prompt Engineer, I enjoy exploring how machine intelligence can enhance our cognitive workflows, optimize design systems, and transform complex challenges into elegant solutions."
    ],

    education: [
      {
        institution: "JECRC University, Jaipur",
        degree: "Bachelor of Technology — Civil Engineering",
        period: "1st Year (2025 - Present)",
        badge: "Higher Education",
        description: "Engaged in core foundational engineering coursework, mathematics, and technical modeling. Actively applying AI methodologies to engineering research, analytical problem solving, and modern infrastructure ideas."
      },
      {
        institution: "Rukmani Birla Modern High School, Jaipur",
        degree: "Senior Secondary & High Schooling",
        period: "Completed",
        badge: "Schooling",
        description: "Built a solid foundation in sciences and mathematics. Developed strong communication skills, an intellectual curiosity for reading, and self-directed study habits."
      }
    ],

    hobbies: [
      {
        icon: "📚",
        title: "Passionate Reader",
        description: "I love reading non-fiction, thought-provoking literature, books on self-growth, philosophy, and modern technological advances. Reading offers fresh perspectives and sharpens mental clarity."
      },
      {
        icon: "☕",
        title: "Cherishing Personal Time",
        description: "I deeply enjoy my quiet personal time. Whether it is peaceful introspection, writing down thoughts, or enjoying an afternoon with a book, downtime fuels my energy, focus, and creativity."
      },
      {
        icon: "🤖",
        title: "Exploring AI Frontiers",
        description: "Experimenting with the latest prompt paradigms, interacting with multimodal AI models, and testing innovative ways to automate cognitive tasks."
      },
      {
        icon: "🌿",
        title: "Mindful Living & Exploration",
        description: "Taking in the cultural beauty and architecture of Jaipur, observing everyday design, and maintaining a balanced, curious lifestyle."
      }
    ]
  },

  // --- Skills Page: Prompt Engineering & AI Generalist ---
  skills: {
    heading: "Skills & Capabilities",
    subtitle: "Merging prompt engineering precision with generalist AI workflows and engineering fundamentals.",
    
    categories: [
      {
        name: "Prompt Engineering & LLM Mastery",
        icon: "🧠",
        highlight: "Core Specialization",
        description: "Crafting structured, high-accuracy context and prompts to unlock peak intelligence from large language models.",
        skillsList: [
          { name: "Few-Shot & Chain-of-Thought Prompting", level: "95%" },
          { name: "System Instructions & Role Personas", level: "92%" },
          { name: "Context Window Optimization & Token Efficiency", level: "88%" },
          { name: "Multi-modal Prompting (Text, Code, Vision)", level: "90%" },
          { name: "Prompt Evaluation & Output Guardrails", level: "85%" }
        ],
        tags: ["ChatGPT (GPT-4o)", "Claude 3.5 Sonnet", "Google Gemini", "System Prompts", "Zero-Shot / Few-Shot"]
      },
      {
        name: "AI Generalist & Applied Workflows",
        icon: "⚡",
        highlight: "Workflow Innovation",
        description: "Synthesizing AI tools across diverse domains to accelerate research, ideation, synthesis, and digital creation.",
        skillsList: [
          { name: "Generative AI Workflow Integration", level: "90%" },
          { name: "AI-Assisted Technical Research & Synthesis", level: "92%" },
          { name: "Automated Content Structuring & Ideation", level: "88%" },
          { name: "Autonomous Agent & Tool Exploration", level: "82%" },
          { name: "AI Ethics & Output Verification", level: "86%" }
        ],
        tags: ["AI Generalist", "Automation", "Knowledge Synthesis", "Tool Stacking", "Agentic Frameworks"]
      },
      {
        name: "Civil Engineering & Technical Foundations",
        icon: "📐",
        highlight: "Academic Discipline",
        description: "Building strong fundamentals in spatial structures, engineering mathematics, and emerging smart civil tech.",
        skillsList: [
          { name: "Engineering Mathematics & Mechanics", level: "85%" },
          { name: "Spatial Thinking & Technical Drawing Concepts", level: "80%" },
          { name: "Smart Infrastructure & AI in Construction", level: "84%" },
          { name: "Sustainable Building Principles", level: "78%" }
        ],
        tags: ["Civil Engineering", "JECRC University", "Smart Infrastructure", "Structural Intuition"]
      },
      {
        name: "Cognitive & Professional Strengths",
        icon: "🌟",
        highlight: "Personal Strengths",
        description: "High-focus habits, continuous self-education, and clear communication.",
        skillsList: [
          { name: "Critical Thinking & Inquiry", level: "94%" },
          { name: "Self-Directed Fast Learning", level: "96%" },
          { name: "Structured Written Communication", level: "90%" },
          { name: "Focus & Reflective Problem Solving", level: "92%" }
        ],
        tags: ["Reading Habit", "Analytical Mindset", "Deep Focus", "Communication"]
      }
    ]
  },

  // --- Contact Page ---
  contact: {
    heading: "Get in Touch",
    subtitle: "Feel free to reach out for collaborations, discussions on AI, or project inquiries.",
    phoneLabel: "Phone Number",
    phoneValue: ".........", // replace with your phone
    phoneNote: "Click to call or copy number",
    
    linkedinLabel: "LinkedIn Profile",
    linkedinValue: "........", // replace with your LinkedIn profile
    linkedinUrl: "https://www.linkedin.com/",
    linkedinNote: "Connect professionally on LinkedIn",
    
    emailLabel: "Email Address",
    emailValue: "isha.sharma@example.com", // replace with your email
    emailNote: "Send an email directly",
    
    cityLabel: "Current Location",
    cityValue: "Jaipur, Rajasthan, India",
    cityNote: "Open to hybrid and remote collaborations"
  }
};

// Export configuration for browser scripts
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
