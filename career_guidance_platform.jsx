import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1a1a2e",
  accent: "#e94560",
  accentSoft: "#ff6b6b",
  teal: "#0f9b8e",
  gold: "#f5a623",
  lavender: "#8b5cf6",
  mint: "#10b981",
  sky: "#3b82f6",
  bg: "#0d0d1a",
  card: "#161628",
  cardBorder: "#2a2a45",
  textPrimary: "#f0f0ff",
  textSecondary: "#9999bb",
  textMuted: "#5555aa",
};

const SESSIONS = [
  { id: "home", label: "Home", icon: "⬡" },
  { id: "assessment", label: "Career Assessment", icon: "◈" },
  { id: "results", label: "My Results", icon: "◉" },
  { id: "explore", label: "Explore Careers", icon: "⬢" },
  { id: "roadmap", label: "Learning Roadmap", icon: "◎" },
  { id: "jobs", label: "Job Market", icon: "⬡" },
  { id: "mentor", label: "AI Mentor", icon: "◈" },
];

const CAREER_CLUSTERS = [
  { id: "tech", name: "Technology & Engineering", icon: "⟨⟩", color: COLORS.sky, careers: ["Software Engineer", "Data Scientist", "Cybersecurity Analyst", "AI/ML Engineer", "DevOps Engineer", "UX Designer"] },
  { id: "science", name: "Science & Research", icon: "⊛", color: COLORS.teal, careers: ["Biomedical Researcher", "Environmental Scientist", "Physicist", "Chemist", "Neuroscientist"] },
  { id: "arts", name: "Creative & Arts", icon: "⌘", color: COLORS.lavender, careers: ["Graphic Designer", "Film Director", "Content Creator", "Game Designer", "Architect", "Musician"] },
  { id: "business", name: "Business & Finance", icon: "◈", color: COLORS.gold, careers: ["Entrepreneur", "Investment Banker", "Marketing Manager", "Consultant", "Accountant", "HR Manager"] },
  { id: "health", name: "Healthcare & Medicine", icon: "⊕", color: COLORS.mint, careers: ["Doctor", "Pharmacist", "Psychologist", "Nurse", "Dentist", "Physical Therapist"] },
  { id: "law", name: "Law & Social Sciences", icon: "⊖", color: COLORS.accent, careers: ["Lawyer", "Judge", "Social Worker", "Journalist", "Policy Analyst", "Diplomat"] },
  { id: "education", name: "Education & Research", icon: "⊗", color: "#f59e0b", careers: ["Professor", "School Teacher", "Curriculum Developer", "Educational Psychologist"] },
  { id: "trades", name: "Skilled Trades & Vocations", icon: "⊘", color: "#ec4899", careers: ["Civil Engineer", "Electrician", "Chef", "Pilot", "Naval Officer"] },
];

const ASSESSMENT_MODULES = [
  {
    id: "analytical",
    title: "Analytical Reasoning",
    subtitle: "Logic & Pattern Recognition",
    color: COLORS.sky,
    questions: [
      { q: "If A > B and B > C, which is true?", opts: ["A > C", "C > A", "A = C", "Cannot determine"], ans: 0 },
      { q: "Complete the pattern: 2, 6, 12, 20, ?", opts: ["28", "30", "32", "36"], ans: 1 },
      { q: "A store sells apples at 3 for $1. How many can you buy for $5?", opts: ["12", "15", "18", "20"], ans: 1 },
      { q: "If all cats are animals, and some animals are pets, then:", opts: ["All cats are pets", "Some cats may be pets", "No cats are pets", "Cats are not animals"], ans: 1 },
      { q: "What comes next: △ ◇ △△ ◇◇ △△△ ?", opts: ["◇◇◇", "△△△△", "◇△", "△◇◇"], ans: 0 },
    ]
  },
  {
    id: "numeric",
    title: "Numerical Ability",
    subtitle: "Math & Data Interpretation",
    color: COLORS.teal,
    questions: [
      { q: "What is 15% of 240?", opts: ["32", "36", "38", "40"], ans: 1 },
      { q: "A car travels 300km in 4 hours. Speed in km/h?", opts: ["65", "70", "75", "80"], ans: 2 },
      { q: "If x² = 144, what is x?", opts: ["10", "11", "12", "14"], ans: 2 },
      { q: "A data set: 4, 7, 9, 7, 5, 7. What is the mode?", opts: ["5", "6.5", "7", "9"], ans: 2 },
      { q: "Simplify: (3 × 4) + (6 ÷ 2) - 5", opts: ["10", "12", "14", "16"], ans: 0 },
    ]
  },
  {
    id: "verbal",
    title: "Verbal & Communication",
    subtitle: "Language & Expression",
    color: COLORS.lavender,
    questions: [
      { q: "Choose the word most opposite to 'Benevolent':", opts: ["Kind", "Malevolent", "Generous", "Caring"], ans: 1 },
      { q: "Which sentence is grammatically correct?", opts: ["Him and me went.", "He and I went.", "He and me went.", "Him and I went."], ans: 1 },
      { q: "'Loquacious' most closely means:", opts: ["Silent", "Talkative", "Wise", "Thoughtful"], ans: 1 },
      { q: "What is the best definition of 'empathy'?", opts: ["Sympathy for others", "Understanding another's feelings", "Emotional distance", "Self awareness"], ans: 1 },
      { q: "Complete: 'The team __ working hard every day.'", opts: ["are", "is", "were", "has"], ans: 1 },
    ]
  },
  {
    id: "creative",
    title: "Creative Thinking",
    subtitle: "Innovation & Problem Solving",
    color: COLORS.accent,
    questions: [
      { q: "How many uses can you think of for a brick? (Select closest)", opts: ["2-3", "4-6", "7-10", "10+"], ans: 3 },
      { q: "When facing a problem, you first:", opts: ["Follow known steps", "Ask others", "Create new solutions", "Avoid the issue"], ans: 2 },
      { q: "Your drawing style is best described as:", opts: ["Technical/precise", "Abstract/expressive", "Realistic", "Mixed"], ans: 1 },
      { q: "You prefer projects that:", opts: ["Have clear guidelines", "Let you improvise", "Follow templates", "Have strict rules"], ans: 1 },
      { q: "When reading, you prefer:", opts: ["Textbooks", "Fiction/stories", "News articles", "Visual infographics"], ans: 3 },
    ]
  },
  {
    id: "social",
    title: "Social & Leadership",
    subtitle: "Teamwork & Interpersonal Skills",
    color: COLORS.mint,
    questions: [
      { q: "In a group project, you usually:", opts: ["Lead and delegate", "Support others' ideas", "Work independently", "Coordinate and mediate"], ans: 0 },
      { q: "How do you handle conflict?", opts: ["Avoid it", "Address it directly", "Seek compromise", "Ask someone else"], ans: 2 },
      { q: "You feel most energized when:", opts: ["Alone", "With close friends", "In large groups", "On stage"], ans: 2 },
      { q: "Others describe you as:", opts: ["Reserved", "Outgoing", "Thoughtful", "Unpredictable"], ans: 1 },
      { q: "When explaining something difficult, you:", opts: ["Use analogies", "Use data", "Show visuals", "All of these"], ans: 3 },
    ]
  },
];

const HOBBY_OPTIONS = [
  "Coding", "Gaming", "Reading", "Writing", "Music", "Drawing/Art",
  "Sports", "Cooking", "Photography", "Travel", "Science Experiments",
  "Volunteering", "Debating", "Robotics", "Fashion", "Business/Trading"
];

const SUBJECT_OPTIONS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Literature", "History", "Geography", "Economics", "Psychology",
  "Fine Arts", "Physical Education", "Philosophy", "Sociology"
];

const JOB_TRENDS = [
  { role: "AI/ML Engineer", growth: 95, salary: "₹12-35 LPA", demand: "Very High", field: "tech" },
  { role: "Data Scientist", growth: 85, salary: "₹10-30 LPA", demand: "Very High", field: "tech" },
  { role: "Cybersecurity Analyst", growth: 80, salary: "₹8-25 LPA", demand: "High", field: "tech" },
  { role: "UX/UI Designer", growth: 70, salary: "₹6-20 LPA", demand: "High", field: "arts" },
  { role: "Biomedical Engineer", growth: 65, salary: "₹8-22 LPA", demand: "High", field: "science" },
  { role: "Digital Marketer", growth: 60, salary: "₹5-18 LPA", demand: "High", field: "business" },
  { role: "Environmental Scientist", growth: 55, salary: "₹6-16 LPA", demand: "Moderate", field: "science" },
  { role: "Financial Analyst", growth: 50, salary: "₹7-20 LPA", demand: "Moderate", field: "business" },
  { role: "Content Creator", growth: 75, salary: "₹4-25 LPA", demand: "High", field: "arts" },
  { role: "Psychologist", growth: 55, salary: "₹5-15 LPA", demand: "Moderate", field: "health" },
];

const ROADMAP_DATA = {
  "Software Engineer": [
    { phase: "Foundation", duration: "6 months", items: ["Learn Python/JavaScript", "Data Structures & Algorithms", "Git & Version Control", "HTML/CSS basics"] },
    { phase: "Core Skills", duration: "6 months", items: ["React or Node.js", "Database (SQL/NoSQL)", "REST APIs", "System Design basics"] },
    { phase: "Specialization", duration: "6 months", items: ["Cloud (AWS/GCP)", "DevOps & CI/CD", "Open Source contributions", "Portfolio projects"] },
    { phase: "Job Ready", duration: "3 months", items: ["Resume & LinkedIn", "Mock interviews", "LeetCode practice", "Apply to companies"] },
  ],
  "Data Scientist": [
    { phase: "Foundation", duration: "4 months", items: ["Python & R basics", "Statistics & Probability", "Excel & SQL", "Linear Algebra"] },
    { phase: "Core ML", duration: "6 months", items: ["Scikit-learn", "Machine Learning algorithms", "Data Visualization", "Pandas & NumPy"] },
    { phase: "Deep Learning", duration: "6 months", items: ["TensorFlow / PyTorch", "NLP & Computer Vision", "Big Data tools", "Kaggle competitions"] },
    { phase: "Industry", duration: "3 months", items: ["Domain specialization", "Business storytelling", "Portfolio & Github", "Apply & network"] },
  ],
};

export default function CareerGuidanceApp() {
  const [session, setSession] = useState("home");
  const [assessmentStep, setAssessmentStep] = useState(0); // 0=intro, 1=hobbies, 2=subjects, 3=grades, 4=modules, 5=done
  const [moduleIdx, setModuleIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState({ math: 75, science: 75, lang: 75, social: 75, cs: 75 });
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Hi! I'm your AI Career Mentor. Ask me anything about careers, courses, entrance exams, or college admissions. What's on your mind?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [topCareers, setTopCareers] = useState([]);
  const [jobFilter, setJobFilter] = useState("all");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleAnswer = (optIdx) => {
    const mod = ASSESSMENT_MODULES[moduleIdx];
    const key = `${mod.id}_${questionIdx}`;
    const isCorrect = optIdx === mod.questions[questionIdx].ans;
    setAnswers(prev => ({ ...prev, [key]: { selected: optIdx, correct: isCorrect } }));
    setTimeout(() => {
      if (questionIdx < mod.questions.length - 1) {
        setQuestionIdx(q => q + 1);
      } else {
        const modScore = Object.entries({ ...answers, [key]: { selected: optIdx, correct: isCorrect } })
          .filter(([k]) => k.startsWith(mod.id))
          .filter(([, v]) => v.correct).length;
        setScores(prev => ({ ...prev, [mod.id]: ((modScore / mod.questions.length) * 100).toFixed(0) }));
        if (moduleIdx < ASSESSMENT_MODULES.length - 1) {
          setModuleIdx(m => m + 1);
          setQuestionIdx(0);
        } else {
          computeResults();
          setAssessmentStep(5);
          setSession("results");
        }
      }
    }, 400);
  };

  const computeResults = () => {
    const finalScores = { ...scores };
    ASSESSMENT_MODULES.forEach(mod => {
      if (!finalScores[mod.id]) finalScores[mod.id] = Math.floor(Math.random() * 30 + 50);
    });
    const ranked = CAREER_CLUSTERS.map(cluster => {
      let match = 0;
      if (cluster.id === "tech") match = (+finalScores.analytical * 0.4 + +finalScores.numeric * 0.4 + +finalScores.creative * 0.2);
      else if (cluster.id === "science") match = (+finalScores.analytical * 0.4 + +finalScores.numeric * 0.3 + +finalScores.creative * 0.3);
      else if (cluster.id === "arts") match = (+finalScores.creative * 0.5 + +finalScores.verbal * 0.3 + +finalScores.social * 0.2);
      else if (cluster.id === "business") match = (+finalScores.numeric * 0.3 + +finalScores.social * 0.4 + +finalScores.analytical * 0.3);
      else if (cluster.id === "health") match = (+finalScores.numeric * 0.3 + +finalScores.social * 0.4 + +finalScores.analytical * 0.3);
      else if (cluster.id === "law") match = (+finalScores.verbal * 0.5 + +finalScores.social * 0.4 + +finalScores.analytical * 0.1);
      else if (cluster.id === "education") match = (+finalScores.verbal * 0.4 + +finalScores.social * 0.4 + +finalScores.analytical * 0.2);
      else match = (+finalScores.creative * 0.3 + +finalScores.numeric * 0.4 + +finalScores.analytical * 0.3);
      const hobbyBonus = hobbies.filter(h => {
        if (cluster.id === "tech") return ["Coding", "Robotics", "Gaming"].includes(h);
        if (cluster.id === "arts") return ["Drawing/Art", "Music", "Photography"].includes(h);
        if (cluster.id === "business") return ["Business/Trading", "Debating"].includes(h);
        return false;
      }).length * 5;
      return { ...cluster, match: Math.min(99, Math.round(match + hobbyBonus)) };
    }).sort((a, b) => b.match - a.match);
    setTopCareers(ranked);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || aiLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setAiLoading(true);
    try {
      const context = topCareers.length > 0
        ? `The student's top career matches are: ${topCareers.slice(0, 3).map(c => c.name).join(", ")}. Their skill scores: ${Object.entries(scores).map(([k, v]) => `${k}: ${v}%`).join(", ")}.`
        : "";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an expert career counselor and education advisor for students in India. ${context} Answer questions about careers, college admissions, entrance exams (JEE, NEET, CAT, CLAT, UPSC, etc.), scholarships, course selections, and study tips. Be encouraging, specific, and actionable. Keep responses concise (3-5 sentences max) unless detailed info is requested.`,
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "I'm here to help! Could you rephrase your question?";
      setChatMessages(prev => [...prev, { role: "ai", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "ai", text: "I'm having trouble connecting right now. Please try again in a moment." }]);
    }
    setAiLoading(false);
  };

  const toggleHobby = (h) => setHobbies(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);
  const toggleSubject = (s) => setSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const progressPct = assessmentStep === 4
    ? Math.round(((moduleIdx * 5 + questionIdx) / (ASSESSMENT_MODULES.length * 5)) * 100)
    : assessmentStep >= 5 ? 100 : Math.round((assessmentStep / 5) * 100);

  const styles = {
    app: { minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
    nav: { background: COLORS.card, borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "0 16px", display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", position: "sticky", top: 0, zIndex: 100 },
    navItem: (active) => ({ padding: "14px 14px", fontSize: "12px", fontWeight: active ? 600 : 400, color: active ? COLORS.accent : COLORS.textSecondary, cursor: "pointer", borderBottom: `2px solid ${active ? COLORS.accent : "transparent"}`, whiteSpace: "nowrap", transition: "all 0.2s", background: "none", border: "none", borderBottom: `2px solid ${active ? COLORS.accent : "transparent"}` }),
    main: { flex: 1, padding: "24px 16px", maxWidth: "900px", margin: "0 auto", width: "100%" },
    card: { background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "16px", padding: "20px", marginBottom: "16px" },
    btn: (color = COLORS.accent) => ({ background: color, color: "#fff", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s" }),
    btnOutline: { background: "transparent", color: COLORS.textSecondary, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "10px", padding: "10px 20px", fontSize: "13px", cursor: "pointer" },
    tag: (active, color = COLORS.accent) => ({ padding: "7px 14px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", border: `1px solid ${active ? color : COLORS.cardBorder}`, background: active ? `${color}22` : "transparent", color: active ? color : COLORS.textSecondary, transition: "all 0.2s", fontWeight: active ? 600 : 400 }),
    progressBar: { height: "4px", background: COLORS.cardBorder, borderRadius: "2px", overflow: "hidden", marginBottom: "24px" },
    progress: { height: "100%", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.lavender})`, width: `${progressPct}%`, transition: "width 0.5s ease", borderRadius: "2px" },
    input: { background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "10px", padding: "12px 16px", color: COLORS.textPrimary, fontSize: "14px", width: "100%", outline: "none", boxSizing: "border-box" },
    scoreBar: (val, color) => ({ height: "8px", background: COLORS.cardBorder, borderRadius: "4px", overflow: "hidden", flex: 1, children: null }),
  };

  // SESSIONS
  const renderHome = () => (
    <div>
      <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", color: COLORS.accent, textTransform: "uppercase", marginBottom: "12px" }}>Your Future Starts Here</div>
        <h1 style={{ fontSize: "36px", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2, background: `linear-gradient(135deg, ${COLORS.textPrimary}, ${COLORS.lavender})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareerCompass AI</h1>
        <p style={{ color: COLORS.textSecondary, fontSize: "15px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.6 }}>Discover your ideal career path through intelligent skill assessment, real-world insights, and personalized guidance.</p>
        <button style={styles.btn()} onClick={() => { setSession("assessment"); setAssessmentStep(0); }}>Start Career Assessment →</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { icon: "◈", title: "Skill Assessments", desc: "5 modules covering logical, numeric, verbal, creative & social skills", color: COLORS.sky },
          { icon: "⬡", title: "Career Matching", desc: "AI-powered matching across 40+ career tracks", color: COLORS.teal },
          { icon: "◎", title: "Learning Roadmaps", desc: "Step-by-step guides to reach your dream career", color: COLORS.lavender },
          { icon: "⊛", title: "Job Market Insights", desc: "Real salary data, demand trends & top companies", color: COLORS.gold },
          { icon: "⌘", title: "AI Mentor Chat", desc: "Ask anything about colleges, exams, and careers", color: COLORS.accent },
          { icon: "◉", title: "Scholarships & Aid", desc: "Find financial support for your education", color: COLORS.mint },
        ].map(f => (
          <div key={f.title} style={{ ...styles.card, borderLeft: `3px solid ${f.color}`, padding: "16px" }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{f.title}</div>
            <div style={{ color: COLORS.textSecondary, fontSize: "12px", lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "15px" }}>How it works</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            ["1", "Complete 5 skill modules", "Analytical, Numeric, Verbal, Creative, Social"],
            ["2", "Share your profile", "Hobbies, subjects, grades & interests"],
            ["3", "Get your career map", "Personalized matches with match % scores"],
            ["4", "Follow your roadmap", "Step-by-step learning plan to your dream career"],
          ].map(([n, t, d]) => (
            <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: COLORS.accent, flexShrink: 0 }}>{n}</div>
              <div><div style={{ fontWeight: 500, fontSize: "14px" }}>{t}</div><div style={{ color: COLORS.textSecondary, fontSize: "12px" }}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => {
    if (assessmentStep === 0) return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: COLORS.accent, marginBottom: "8px", textTransform: "uppercase" }}>Step 1 of 5</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>Tell us about your hobbies</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Select all activities you genuinely enjoy doing in your free time.</p>
        </div>
        <div style={styles.progressBar}><div style={styles.progress} /></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {HOBBY_OPTIONS.map(h => <button key={h} style={styles.tag(hobbies.includes(h))} onClick={() => toggleHobby(h)}>{h}</button>)}
        </div>
        <div style={{ color: COLORS.textSecondary, fontSize: "13px", marginBottom: "20px" }}>{hobbies.length} selected</div>
        <button style={styles.btn()} onClick={() => setAssessmentStep(1)}>Continue →</button>
      </div>
    );

    if (assessmentStep === 1) return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: COLORS.teal, marginBottom: "8px", textTransform: "uppercase" }}>Step 2 of 5</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>Your favourite subjects</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Which school subjects excite you the most?</p>
        </div>
        <div style={styles.progressBar}><div style={styles.progress} /></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {SUBJECT_OPTIONS.map(s => <button key={s} style={styles.tag(subjects.includes(s), COLORS.teal)} onClick={() => toggleSubject(s)}>{s}</button>)}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.btnOutline} onClick={() => setAssessmentStep(0)}>← Back</button>
          <button style={styles.btn(COLORS.teal)} onClick={() => setAssessmentStep(2)}>Continue →</button>
        </div>
      </div>
    );

    if (assessmentStep === 2) return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: COLORS.lavender, marginBottom: "8px", textTransform: "uppercase" }}>Step 3 of 5</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>Academic Performance</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Slide to indicate your approximate marks in each subject area.</p>
        </div>
        <div style={styles.progressBar}><div style={styles.progress} /></div>
        <div style={styles.card}>
          {[
            ["math", "Mathematics", COLORS.sky],
            ["science", "Science", COLORS.teal],
            ["lang", "Languages / English", COLORS.lavender],
            ["social", "Social Studies / History", COLORS.gold],
            ["cs", "Computer Science", COLORS.accent],
          ].map(([key, label, color]) => (
            <div key={key} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color }}>{grades[key]}%</span>
              </div>
              <input type="range" min="0" max="100" value={grades[key]} onChange={e => setGrades(g => ({ ...g, [key]: +e.target.value }))}
                style={{ width: "100%", accentColor: color }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.btnOutline} onClick={() => setAssessmentStep(1)}>← Back</button>
          <button style={styles.btn(COLORS.lavender)} onClick={() => setAssessmentStep(3)}>Continue →</button>
        </div>
      </div>
    );

    if (assessmentStep === 3) return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: COLORS.gold, marginBottom: "8px", textTransform: "uppercase" }}>Step 4 of 5</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>Skill Assessments</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>5 short modules · 5 questions each · ~10 minutes total</p>
        </div>
        <div style={styles.progressBar}><div style={styles.progress} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {ASSESSMENT_MODULES.map((mod, i) => (
            <div key={mod.id} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderLeft: `3px solid ${mod.color}` }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${mod.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: mod.color, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>{mod.title}</div>
                <div style={{ color: COLORS.textSecondary, fontSize: "12px" }}>{mod.subtitle} · 5 questions</div>
              </div>
              <div style={{ fontSize: "12px", color: mod.color }}>5 min</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.btnOutline} onClick={() => setAssessmentStep(2)}>← Back</button>
          <button style={styles.btn(COLORS.gold)} onClick={() => { setAssessmentStep(4); setModuleIdx(0); setQuestionIdx(0); setAnswers({}); setScores({}); }}>Start Tests →</button>
        </div>
      </div>
    );

    if (assessmentStep === 4) {
      const mod = ASSESSMENT_MODULES[moduleIdx];
      const q = mod.questions[questionIdx];
      const answered = answers[`${mod.id}_${questionIdx}`];
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: mod.color, textTransform: "uppercase" }}>{mod.title}</div>
            <div style={{ fontSize: "12px", color: COLORS.textSecondary }}>Module {moduleIdx + 1}/{ASSESSMENT_MODULES.length} · Q{questionIdx + 1}/5</div>
          </div>
          <div style={styles.progressBar}><div style={styles.progress} /></div>
          <div style={{ ...styles.card, borderLeft: `3px solid ${mod.color}`, marginBottom: "20px" }}>
            <div style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.5 }}>{q.q}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.opts.map((opt, i) => {
              let border = `1px solid ${COLORS.cardBorder}`;
              let bg = COLORS.card;
              let color = COLORS.textPrimary;
              if (answered) {
                if (i === q.ans) { border = `1px solid ${COLORS.mint}`; bg = `${COLORS.mint}15`; color = COLORS.mint; }
                else if (i === answered.selected && !answered.correct) { border = `1px solid ${COLORS.accent}`; bg = `${COLORS.accent}15`; color = COLORS.accent; }
              }
              return (
                <button key={i} disabled={!!answered} onClick={() => handleAnswer(i)}
                  style={{ background: bg, border, borderRadius: "12px", padding: "14px 18px", fontSize: "14px", color, cursor: answered ? "default" : "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "inherit" }}>
                  <span style={{ opacity: 0.5, marginRight: "10px" }}>{["A", "B", "C", "D"][i]}.</span>{opt}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderResults = () => {
    if (topCareers.length === 0) return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>◎</div>
        <h2>No results yet</h2>
        <p style={{ color: COLORS.textSecondary }}>Complete the Career Assessment first to see your results.</p>
        <button style={styles.btn()} onClick={() => { setSession("assessment"); setAssessmentStep(0); }}>Take Assessment</button>
      </div>
    );
    return (
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>Your Career Profile</h2>
        <p style={{ color: COLORS.textSecondary, fontSize: "14px", marginBottom: "24px" }}>Based on your skills, interests & academics</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "24px" }}>
          {ASSESSMENT_MODULES.map(mod => (
            <div key={mod.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "12px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: mod.color }}>{scores[mod.id] || "–"}%</div>
              <div style={{ fontSize: "11px", color: COLORS.textSecondary, marginTop: "4px" }}>{mod.title}</div>
            </div>
          ))}
        </div>

        <div style={{ ...styles.card, marginBottom: "24px" }}>
          <div style={{ fontWeight: 600, marginBottom: "16px" }}>Skill Breakdown</div>
          {ASSESSMENT_MODULES.map(mod => (
            <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "100px", fontSize: "12px", color: COLORS.textSecondary, flexShrink: 0 }}>{mod.title.split(" ")[0]}</div>
              <div style={{ flex: 1, height: "8px", background: COLORS.bg, borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${scores[mod.id] || 0}%`, background: mod.color, borderRadius: "4px", transition: "width 1s ease" }} />
              </div>
              <div style={{ width: "36px", fontSize: "12px", fontWeight: 600, color: mod.color, textAlign: "right" }}>{scores[mod.id] || 0}%</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontWeight: 600, fontSize: "16px", marginBottom: "12px" }}>Best Career Matches</h3>
        {topCareers.slice(0, 5).map((career, i) => (
          <div key={career.id} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", borderLeft: `3px solid ${career.color}` }}
            onClick={() => { setSelectedCareer(career); setSession("roadmap"); }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `${career.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{career.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>{career.name}</div>
              <div style={{ color: COLORS.textSecondary, fontSize: "12px", marginTop: "2px" }}>{career.careers.slice(0, 3).join(", ")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: career.color }}>{career.match}%</div>
              <div style={{ fontSize: "10px", color: COLORS.textMuted }}>match</div>
            </div>
          </div>
        ))}

        {hobbies.length > 0 && (
          <div style={styles.card}>
            <div style={{ fontWeight: 600, marginBottom: "10px", fontSize: "14px" }}>Your Profile Snapshot</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {hobbies.map(h => <span key={h} style={{ ...styles.tag(true, COLORS.lavender), fontSize: "11px" }}>{h}</span>)}
              {subjects.slice(0, 5).map(s => <span key={s} style={{ ...styles.tag(true, COLORS.teal), fontSize: "11px" }}>{s}</span>)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderExplore = () => (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>Explore Careers</h2>
      <p style={{ color: COLORS.textSecondary, fontSize: "14px", marginBottom: "24px" }}>Browse all career clusters and find what excites you</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
        {CAREER_CLUSTERS.map(cluster => (
          <div key={cluster.id} style={{ ...styles.card, cursor: "pointer", borderTop: `3px solid ${cluster.color}` }}
            onClick={() => { setSelectedCareer(cluster); setSession("roadmap"); }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ fontSize: "24px" }}>{cluster.icon}</div>
              {topCareers.find(c => c.id === cluster.id) && (
                <span style={{ fontSize: "11px", fontWeight: 700, color: cluster.color, background: `${cluster.color}15`, padding: "3px 8px", borderRadius: "20px" }}>
                  {topCareers.find(c => c.id === cluster.id)?.match}% match
                </span>
              )}
            </div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>{cluster.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {cluster.careers.slice(0, 4).map(c => (
                <span key={c} style={{ fontSize: "10px", color: COLORS.textMuted, background: COLORS.bg, padding: "3px 8px", borderRadius: "10px" }}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoadmap = () => {
    const career = selectedCareer || topCareers[0];
    if (!career) return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <p style={{ color: COLORS.textSecondary }}>Complete the assessment or explore careers first.</p>
        <button style={styles.btn()} onClick={() => setSession("explore")}>Explore Careers</button>
      </div>
    );
    const careerKey = Object.keys(ROADMAP_DATA)[0];
    const roadmap = ROADMAP_DATA["Software Engineer"];
    const phaseColors = [COLORS.sky, COLORS.teal, COLORS.lavender, COLORS.accent];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${career.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{career.icon}</div>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>{career.name}</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: "13px", margin: 0 }}>Suggested learning roadmap · 21 months</p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {career.careers.map(c => (
            <span key={c} style={{ fontSize: "12px", color: career.color, background: `${career.color}15`, padding: "5px 12px", borderRadius: "20px", border: `1px solid ${career.color}33` }}>{c}</span>
          ))}
        </div>

        <div style={{ marginBottom: "24px" }}>
          {roadmap.map((phase, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${phaseColors[i]}22`, border: `2px solid ${phaseColors[i]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: phaseColors[i], flexShrink: 0 }}>{i + 1}</div>
                {i < roadmap.length - 1 && <div style={{ width: "2px", flex: 1, background: COLORS.cardBorder, marginTop: "4px", minHeight: "40px" }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ fontWeight: 600, fontSize: "15px" }}>{phase.phase}</div>
                  <span style={{ fontSize: "11px", color: phaseColors[i], background: `${phaseColors[i]}15`, padding: "3px 8px", borderRadius: "10px" }}>{phase.duration}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {phase.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: COLORS.textSecondary }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: phaseColors[i], flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={{ fontWeight: 600, marginBottom: "12px", fontSize: "14px" }}>Entrance Exams & Certifications</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
            {["JEE Main/Advanced", "GATE", "AWS Certified", "Google Cloud", "NPTEL", "Coursera Certificates"].map(exam => (
              <div key={exam} style={{ background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "8px", padding: "10px", fontSize: "12px", color: COLORS.textSecondary, textAlign: "center" }}>{exam}</div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ fontWeight: 600, marginBottom: "12px", fontSize: "14px" }}>Top Colleges in India</div>
          {["IIT Bombay", "IIT Delhi", "BITS Pilani", "NIT Trichy", "IIT Madras", "VIT Vellore"].map(c => (
            <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.cardBorder}`, fontSize: "13px" }}>
              <span>{c}</span><span style={{ color: COLORS.gold, fontSize: "12px" }}>★ Top Rated</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderJobs = () => (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>Job Market Insights</h2>
      <p style={{ color: COLORS.textSecondary, fontSize: "14px", marginBottom: "20px" }}>2025-26 demand, salaries & growth trends</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {["all", "tech", "science", "business", "arts", "health"].map(f => (
          <button key={f} style={styles.tag(jobFilter === f, COLORS.gold)} onClick={() => setJobFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {JOB_TRENDS.filter(j => jobFilter === "all" || j.field === jobFilter).map(job => (
          <div key={job.role} style={{ ...styles.card, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>{job.role}</div>
                <div style={{ color: COLORS.textSecondary, fontSize: "13px", marginTop: "2px" }}>{job.salary}</div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px", background: job.demand === "Very High" ? `${COLORS.mint}22` : job.demand === "High" ? `${COLORS.gold}22` : `${COLORS.textMuted}22`, color: job.demand === "Very High" ? COLORS.mint : job.demand === "High" ? COLORS.gold : COLORS.textSecondary }}>{job.demand}</span>
              </div>
            </div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px", color: COLORS.textSecondary }}>
                <span>Growth Index</span><span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{job.growth}%</span>
              </div>
              <div style={{ height: "6px", background: COLORS.bg, borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${job.growth}%`, background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.sky})`, borderRadius: "3px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, marginTop: "8px" }}>
        <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "15px" }}>Scholarships & Financial Aid</div>
        {[
          ["National Scholarship Portal", "Central govt scholarships", COLORS.sky],
          ["INSPIRE Scholarship", "Science & tech excellence", COLORS.teal],
          ["Prime Minister Scholarship", "For wards of ex-servicemen", COLORS.lavender],
          ["Merit-cum-Means Scholarships", "Minority students", COLORS.gold],
          ["State Government Schemes", "Check your state portal", COLORS.mint],
        ].map(([name, desc, color]) => (
          <div key={name} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "6px" }} />
            <div>
              <div style={{ fontWeight: 500, fontSize: "13px" }}>{name}</div>
              <div style={{ fontSize: "12px", color: COLORS.textSecondary }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentor = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>AI Career Mentor</h2>
      <p style={{ color: COLORS.textSecondary, fontSize: "13px", marginBottom: "16px" }}>Ask me about careers, entrance exams, colleges, scholarships, and more</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {["What careers suit me?", "Best colleges for CS?", "How to crack JEE?", "Scholarships for Kerala?", "Salary in data science?"].map(q => (
          <button key={q} style={{ fontSize: "11px", padding: "6px 12px", borderRadius: "20px", border: `1px solid ${COLORS.cardBorder}`, background: "transparent", color: COLORS.textSecondary, cursor: "pointer", fontFamily: "inherit" }} onClick={() => { setChatInput(q); }}>{q}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "12px", padding: "4px 0" }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "12px 16px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? `${COLORS.accent}22` : COLORS.card,
              border: `1px solid ${msg.role === "user" ? COLORS.accent + "44" : COLORS.cardBorder}`,
              fontSize: "14px", lineHeight: 1.6, color: COLORS.textPrimary,
            }}>{msg.text}</div>
          </div>
        ))}
        {aiLoading && (
          <div style={{ display: "flex", gap: "4px", padding: "12px 16px" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.accent, animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
          placeholder="Ask anything about your career journey..." style={{ ...styles.input, flex: 1 }} />
        <button onClick={sendChat} disabled={aiLoading} style={{ ...styles.btn(), padding: "12px 20px", opacity: aiLoading ? 0.6 : 1 }}>Send</button>
      </div>
    </div>
  );

  const renderSession = () => {
    switch (session) {
      case "home": return renderHome();
      case "assessment": return renderAssessment();
      case "results": return renderResults();
      case "explore": return renderExplore();
      case "roadmap": return renderRoadmap();
      case "jobs": return renderJobs();
      case "mentor": return renderMentor();
      default: return renderHome();
    }
  };

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
        * { box-sizing: border-box; }
        input[type=range] { cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a45; border-radius: 2px; }
      `}</style>
      <nav style={styles.nav}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: COLORS.accent, marginRight: "8px", flexShrink: 0 }}>◈ CC</div>
        {SESSIONS.map(s => (
          <button key={s.id} style={{ ...styles.navItem(session === s.id), background: "none", border: "none", borderBottom: `2px solid ${session === s.id ? COLORS.accent : "transparent"}` }}
            onClick={() => setSession(s.id)}>{s.label}</button>
        ))}
      </nav>
      <main style={styles.main}>
        {renderSession()}
      </main>
    </div>
  );
}
