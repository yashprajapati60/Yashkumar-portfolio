'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Check, ChevronRight, Command, Cpu, Download, ExternalLink, FlaskConical, GitFork, Github, GraduationCap, Linkedin, Mail, Menu, Network, Search, Star, Terminal as TerminalIcon, X, Zap } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const NeuralScene = dynamic(() => import('./NeuralScene'), { ssr: false, loading: () => <div className="scene-loading"><div className="loader-orbit" /><span>Initializing neural field…</span></div> });

const projects = [
  { id: 'phi3', num: '01', name: 'Fine-Tuned Phi-3 Mini LLM', type: 'GENERATIVE AI', summary: 'Fine-tuned a compact language model for structured product-information extraction from raw HTML.', stack: ['Phi-3 Mini', 'Unsloth', 'LoRA', 'Hugging Face TRL'], detail: 'Fine-tuned Phi-3 Mini in 4-bit using Unsloth, LoRA and Hugging Face TRL’s SFTTrainer on a custom instruction-style dataset. The model was deployed for structured product information extraction from raw HTML.', icon: BrainCircuit, accent: 'violet' },
  { id: 'ollama', num: '02', name: 'Chatbot with Ollama3', type: 'LLM APPLICATION', summary: 'A local-LLM chatbot with a modular LangChain architecture and a real-time Streamlit frontend.', stack: ['LangChain', 'Ollama3', 'LangServe', 'Streamlit'], detail: 'Built an interactive chatbot application using LangChain for prompt engineering, with a local Ollama3 LLM integrated via LangServe and a real-time Streamlit frontend. The modular architecture supports future memory and retrieval integration.', icon: Network, accent: 'cyan' },
  { id: 'mnist', num: '03', name: 'Handwritten Digit Recognition', type: 'DEEP LEARNING', summary: 'A multi-layer CNN trained on MNIST, reaching approximately 89% test accuracy.', stack: ['TensorFlow', 'Keras', 'CNN', 'Matplotlib'], detail: 'Built and trained a multi-layer CNN in TensorFlow/Keras to classify handwritten digits, achieving approximately 96% training accuracy and 89% testing accuracy after preprocessing, normalization and performance visualization.', icon: Cpu, accent: 'blue' },
  { id: 'spam', num: '04', name: 'SMS Spam Classifier', type: 'MACHINE LEARNING', summary: 'Text classification using TF-IDF / CountVectorizer and multiple evaluated ML models.', stack: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'], detail: 'Built an SMS spam classifier in Python using TF-IDF and CountVectorizer for feature extraction, training and evaluating multiple machine-learning models to optimize accuracy and precision on spam/ham classification.', icon: Zap, accent: 'green' },
  { id: 'vgg16', num: '05', name: 'Transfer Learning with VGG16', type: 'COMPUTER VISION', summary: 'ImageNet-pretrained VGG16 with augmentation and custom dense/dropout layers.', stack: ['PyTorch', 'VGG16', 'Transfer Learning', 'ImageNet'], detail: 'Implemented VGG16-based transfer learning with pretrained ImageNet weights on Fashion MNIST, applying data augmentation and customized dense/dropout layers to improve generalization and reduce overfitting.', icon: BrainCircuit, accent: 'pink' },
  { id: 'lc-models', num: '06', name: 'LangChain Model Integrations', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Connected LangChain chat workflows to hosted model providers and explored model invocation.', stack: ['LangChain', 'Gemini', 'Groq', 'OpenAI-compatible APIs'], detail: 'Notebook exploration of chat-model connections and invocation patterns, including Gemini and Groq-hosted OpenAI-compatible models. The notebook also contains an Anthropic connection heading; no completed Anthropic implementation is claimed here.', icon: Network, accent: 'cyan' },
  { id: 'prompt-chains', num: '07', name: 'Prompt Templates & LCEL Chains', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Reusable prompt templates, output parsing and runnable chains.', stack: ['ChatPromptTemplate', 'LCEL', 'StrOutputParser'], detail: 'Built dynamic chat prompt templates and composed runnable chains using prompt templates, a chat model, string output parsing and a custom text transformation function.', icon: BrainCircuit, accent: 'violet' },
  { id: 'memory', num: '08', name: 'Conversational Memory', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Explored maintaining and managing conversation history in LangChain chat workflows.', stack: ['LangChain', 'Chat History', 'Gemini', 'Groq'], detail: 'Notebook focused on managing chat history and carrying conversational context across interactions using LangChain model integrations.', icon: Network, accent: 'blue' },
  { id: 'structured', num: '09', name: 'Structured Output Extraction', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Typed, schema-shaped model responses using Pydantic.', stack: ['Pydantic', 'BaseModel', 'Structured Outputs'], detail: 'Defined Pydantic response schemas and used a model structured-output interface to convert free-form text into validated structured fields, including a multi-item movie schema example.', icon: Cpu, accent: 'green' },
  { id: 'ollama-lab', num: '10', name: 'Local LLM Runtime Experiments', type: 'LOCAL AI · NOTEBOOK', summary: 'Ran local chat models through Ollama using compact open models.', stack: ['Ollama', 'Gemma 3 1B', 'DeepSeek-R1 7B'], detail: 'Connected to local Ollama chat models and experimented with Gemma 3 1B and DeepSeek-R1 7B through LangChain’s ChatOllama integration.', icon: BrainCircuit, accent: 'pink' },
  { id: 'groq', num: '11', name: 'Groq LLM Integration', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Connected LangChain to Groq-hosted language models.', stack: ['LangChain', 'ChatGroq', 'GPT-OSS 20B'], detail: 'A focused integration notebook for connecting to a Groq-hosted model using LangChain ChatGroq and invoking it in an application workflow.', icon: Zap, accent: 'violet' },
  { id: 'streaming', num: '12', name: 'Streaming LLM Responses', type: 'LLM FOUNDATIONS · NOTEBOOK', summary: 'Explored token/message streaming for responsive chat experiences.', stack: ['LangChain', 'Gemini', 'Groq', 'Ollama'], detail: 'Compared streaming-enabled chat model integrations and explored displaying model output incrementally rather than waiting for a complete response.', icon: Network, accent: 'cyan' },
  { id: 'math-agent', num: '13', name: 'Tool-Calling Math Agent', type: 'AI AGENT · NOTEBOOK', summary: 'A basic tool-using agent that can call custom arithmetic tools.', stack: ['LangChain Agents', 'Python Tools', 'Groq'], detail: 'Defined custom add_numbers and mul_numbers tools and connected them to a LangChain agent so the model can select and invoke tools to answer arithmetic questions.', icon: Cpu, accent: 'blue' },
  { id: 'google-agent', num: '14', name: 'Google Search AI Agent', type: 'AI AGENT · NOTEBOOK + SCRIPT', summary: 'An agent that can call Google search through Serper and retain thread state.', stack: ['LangChain', 'Google Serper', 'Groq', 'LangGraph Memory'], detail: 'Created a search tool with GoogleSerperAPIWrapper, connected it to a Groq-powered agent, and configured a LangGraph MemorySaver checkpointer with a thread ID for conversational continuity. Also implemented a command-line version.', icon: Network, accent: 'green' },
  { id: 'doc-loaders', num: '15', name: 'Multi-Source Document Loading', type: 'RAG · NOTEBOOK', summary: 'Loaded text, PDF, CSV, webpage and Wikipedia content into document workflows.', stack: ['TextLoader', 'PyPDFLoader', 'CSVLoader', 'WebBaseLoader', 'WikipediaLoader'], detail: 'Explored LangChain document loaders for local text files, PDFs, CSV files, web pages and Wikipedia. This forms the ingestion stage for document-grounded retrieval workflows.', icon: FlaskConical, accent: 'pink' },
  { id: 'splitters', num: '16', name: 'Recursive Document Chunking', type: 'RAG · NOTEBOOK', summary: 'Split text and loaded documents into overlapping chunks for retrieval.', stack: ['RecursiveCharacterTextSplitter', 'Chunking', 'Overlap'], detail: 'Experimented with RecursiveCharacterTextSplitter using configurable chunk sizes and overlap, and applied it to text and PDF documents before retrieval.', icon: FlaskConical, accent: 'cyan' },
  { id: 'embeddings', num: '17', name: 'Qwen3 Embeddings & Chroma Vector Search', type: 'RAG · NOTEBOOK', summary: 'Generated embeddings and stored searchable vectors in a persistent Chroma collection.', stack: ['Qwen3 Embedding 0.6B', 'Ollama', 'Chroma', 'Similarity Search'], detail: 'Generated document embeddings with OllamaEmbeddings using qwen3-embedding:0.6b, stored them in Chroma with a persistent directory, and tested top-k similarity search.', icon: Network, accent: 'violet' },
  { id: 'pdf-rag', num: '18', name: 'PDF-Based RAG Question Answering', type: 'RAG APPLICATION · NOTEBOOK', summary: 'A retrieval-augmented Q&A chain grounded in a PDF implementation guide.', stack: ['PyPDFLoader', 'Chroma', 'Qwen3 Embeddings', 'Groq', 'PromptTemplate'], detail: 'Loaded the Nagar AI Gujarat implementation book, split it into chunks, embedded and indexed the content in Chroma, retrieved relevant passages and passed the context into a prompt-driven Groq answer chain.', icon: FlaskConical, accent: 'blue' },
  { id: 'rag-agent', num: '19', name: 'Document Retrieval AI Agent', type: 'RAG + AGENT · NOTEBOOK', summary: 'An AI agent that calls a custom PDF retriever tool to answer document questions.', stack: ['LangChain Agent', 'Retriever Tool', 'InMemoryVectorStore', 'Qwen3 Embeddings'], detail: 'Loaded and chunked the Nagar AI Gujarat implementation book, indexed chunks in an in-memory vector store, exposed similarity retrieval as a custom tool, and instructed the agent to use retrieved context for knowledge questions.', icon: BrainCircuit, accent: 'green' },
  { id: 'streamlit-qna', num: '20', name: 'Gemini Streamlit Q&A Bot', type: 'APPLICATION · PYTHON SCRIPT', summary: 'A simple web chat interface with message history and Gemini responses.', stack: ['Streamlit', 'Gemini', 'Chat UI', 'Session State'], detail: 'Built a Streamlit Q&A chatbot using Gemini, chat_input, chat_message and session state to display and retain a conversation during the app session.', icon: Network, accent: 'cyan' },
  { id: 'cli-search', num: '21', name: 'Command-Line Google Search Agent', type: 'AI AGENT · PYTHON SCRIPT', summary: 'A terminal-based search agent using a Groq model and Google Serper tool.', stack: ['Python', 'LangChain create_agent', 'Google Serper', 'MemorySaver'], detail: 'Implemented a command-line loop around a Groq-powered agent with a Google Serper search tool and MemorySaver checkpointer, using a thread ID to continue the conversation.', icon: Cpu, accent: 'violet' },
  { id: 'groq-streamlit', num: '22', name: 'Streaming Search Chatbot', type: 'AI AGENT · STREAMLIT SCRIPT', summary: 'A Streamlit chat app combining Google search, Groq agent reasoning and streamed output.', stack: ['Streamlit', 'Groq', 'Google Serper', 'LangGraph', 'Streaming'], detail: 'Built a Streamlit chat interface around a search-enabled Groq agent, configured checkpoint memory and streamed message chunks into the UI while maintaining visible chat history.', icon: Zap, accent: 'blue' },
  { id: 'sql-agent', num: '23', name: 'SQL Task Management AI Agent', type: 'AGENTIC AI · APPLICATION', summary: 'A natural-language task manager backed by SQLite and SQL database tools.', stack: ['LangChain SQL Toolkit', 'Groq', 'SQLite', 'Streamlit', 'LangGraph Memory'], detail: 'Created a task-management agent with a SQLite tasks table and SQLDatabaseToolkit. Its system instructions cover schema inspection, natural-language CRUD requests, ambiguity handling, result verification, WHERE-clause requirements, confirmation before deletion and session memory. The uploaded script documents the application workflow; it does not include deployment evidence.', icon: Cpu, accent: 'green' }
];

const skillGroups = [
  { label: 'PROGRAMMING', values: ['Python', 'SQL'] },
  { label: 'MACHINE LEARNING & VISION', values: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenCV', 'CNNs', 'Transfer Learning'] },
  { label: 'GENERATIVE & AGENTIC AI', values: ['Generative AI', 'LLMs', 'AI Agents', 'Agentic AI Concepts', 'Tool Calling', 'LangChain', 'LangGraph', 'Prompt Engineering', 'Structured Outputs'] },
  { label: 'RAG & VECTOR SEARCH', values: ['RAG Concepts', 'Document Loaders', 'Chunking', 'Embeddings', 'Chroma', 'Similarity Search', 'PDF Q&A'] },
  { label: 'LLM PLATFORMS & APP DEVELOPMENT', values: ['Ollama', 'Groq', 'Gemini', 'Streamlit', 'LCEL Chains', 'Conversation Memory', 'Streaming Responses'] },
  { label: 'DATA & VISUALIZATION', values: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau', 'MySQL', 'DBeaver'] },
  { label: 'TOOLS & WORKFLOW', values: ['Jupyter Notebook', 'Google Colab', 'VS Code', 'BeautifulSoup', 'Web Scraping', 'ML Pipelines', 'Requirement Gathering'] }
];

const experience = [
  { role: 'Part-Time Lecturer', org: 'Gandhinagar University', date: 'JUN 2026 — PRESENT', place: 'Gandhinagar, India', desc: 'Design and deliver comprehensive lecture modules in Data Science and Basics of Information Security for 5th-semester diploma students.', tag: 'EDUCATION' },
  { role: 'Business Analyst', org: 'Sahay Consultancy Group', date: 'JAN 2025 — MAY 2025', place: 'Ahmedabad, India', desc: 'Automated recurring Python data pipelines and migrated static reports to live, cloud-hosted Power BI dashboards. Built real-time tracking dashboards and standardized data workflows.', tag: 'BUSINESS INTELLIGENCE', metrics: ['40% less manual reporting time', '35% faster operational insights', 'Zero recurring data-entry errors across 3 reporting cycles'] },
  { role: 'Data Analyst', org: 'Parle Elizabeth Pvt Ltd', date: 'JUL 2024 — JAN 2025', place: 'Sanand, India', desc: 'Built live manufacturing KPI dashboards in Power BI and applied statistical analysis to manufacturing data, surfacing bottlenecks for plant supervisors.', tag: 'DATA ANALYTICS', metrics: ['25% fewer downtime incidents', '30% improvement in tracking accuracy'] }
];

const commands: Record<string, string> = {
  help: 'Available commands: about, skills, agentic, rag, labs, projects, github, research, papers, experience, education, contact, resume, clear',
  about: 'AI/ML graduate pursuing an M.Tech in AI/ML at Gandhinagar University. Interested in building intelligent applications across machine learning, deep learning and generative AI.',
  skills: 'Python · SQL · PyTorch · TensorFlow · Keras · scikit-learn · OpenCV · LangChain · LangGraph · Agentic AI Concepts · AI Agents · RAG Concepts · Embeddings · Chroma · Ollama · Groq · Gemini · Streamlit · Pydantic · Prompt Engineering · LCEL · Power BI · Tableau',
  agentic: 'Agentic AI concepts, tool-using agents, Google Search agents, RAG retrieval agents and a SQL task-management agent are represented in the uploaded notebooks and scripts. Scroll to #projects.',
  rag: 'RAG work includes document loading, recursive chunking, Qwen3 embeddings, Chroma vector search, PDF question answering and a retrieval-augmented AI agent. Scroll to #projects.',
  labs: 'Uploaded work includes 14 LangChain notebooks and 4 Python applications. The portfolio groups them into 18 hands-on modules alongside 5 resume-featured projects. Scroll to #projects.',
  projects: 'The portfolio includes 23 documented builds and learning modules: 5 resume-featured projects plus LangChain, agent, RAG, document retrieval, local LLM, Streamlit and SQL-agent work. Scroll to #projects.',
  github: 'Browse public repositories from github.com/yashprajapati60 in the GitHub Project Universe section.',
  research: 'Research profile: one published review paper — A Survey on Generative AI Frameworks for Data Driven Decision Making (international conference organized by Gandhinagar University) — and one ongoing M.Tech research project on inference-time visual evidence reliability for robust VLMs under image corruption. Scroll to #research.',
  papers: 'Published review paper: A Survey on Generative AI Frameworks for Data Driven Decision Making. Author: Yashkumar Prajapati. International conference organized by Gandhinagar University. The uploaded paper does not specify the conference name, date, DOI or proceedings URL. Current research: Inference-Time Visual Evidence Reliability for Robust VLM Under Image Corruption (ongoing). Scroll to #research.',
  experience: 'Part-Time Lecturer — Gandhinagar University (Jun 2026–Present); Business Analyst — Sahay Consultancy Group (Jan–May 2025); Data Analyst — Parle Elizabeth Pvt Ltd (Jul 2024–Jan 2025).',
  education: 'M.Tech, Artificial Intelligence and Machine Learning — Gandhinagar University (Aug 2025–Sep 2027, in progress), SPGA 9.55. B.E., Information Technology — Apollo Institute of Engineering and Technology (Nov 2021–May 2025), CGPA 8.20.',
  contact: 'Email: yashkumarprajapati679@gmail.com | LinkedIn: linkedin.com/in/yashkumar-prajapati-b034b9285 | GitHub: github.com/yashprajapati60',
  resume: 'Resume is available from the Download Resume button or /Yashkumar-Prajapati-Resume.pdf.',
  clear: ''
};

function TerminalPanel() {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: 'whoami', output: 'yashkumar-prajapati  |  AI/ML Engineer  |  Ahmedabad, India' },
    { cmd: 'help', output: commands.help }
  ]);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const run = (raw: string) => {
    const safeRaw = raw.slice(0, 80).replace(/[\u0000-\u001f\u007f]/g, '');
    const cmd = safeRaw.trim().toLowerCase(); if (!cmd) return;
    if (cmd === 'clear') { setHistory([]); setValue(''); return; }
    setHistory(prev => [...prev, { cmd: safeRaw, output: commands[cmd] ?? `Command not found: ${cmd}. Type 'help' to see available commands.` }].slice(-40)); setValue('');
    if (cmd === 'projects' || cmd === 'labs' || cmd === 'agentic' || cmd === 'rag' || cmd === 'experience' || cmd === 'github' || cmd === 'research' || cmd === 'papers') document.getElementById(cmd)?.scrollIntoView({ behavior: 'smooth' });
    if (cmd === 'contact') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const submit = (e: FormEvent) => { e.preventDefault(); run(value); };
  return <div className={`terminal-window ${open ? 'terminal-expanded' : ''}`}>
    <div className="terminal-top"><div className="traffic"><i/><i/><i/></div><span><TerminalIcon size={13}/> YASHKUMAR_TERMINAL — zsh</span><button onClick={() => setOpen(!open)} aria-label="Toggle terminal size">{open ? 'COLLAPSE' : 'EXPAND'}</button></div>
    <div className="terminal-body" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="terminal-welcome">Yashkumar interactive portfolio shell <span className="terminal-version">v1.0.0</span><br/><span className="muted">Type <b>help</b> to explore the portfolio.</span></div>
      {history.map((item, i) => <div className="terminal-entry" key={i}><div className="terminal-command"><span>yash@portfolio</span>:<b>~</b>$ {item.cmd}</div><p>{item.output}</p></div>)}
      <form className="terminal-form" onSubmit={submit}><label htmlFor="terminal-input"><span>yash@portfolio</span>:<b>~</b>$</label><input id="terminal-input" value={value} onChange={e => setValue(e.target.value)} autoComplete="off" spellCheck={false} placeholder="enter a command..." maxLength={80}/><button aria-label="Run command"><ChevronRight size={17}/></button></form>
    </div>
  </div>;
}

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

function GitHubUniverse() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/yashprajapati60/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
      cache: 'no-store'
    })
      .then(async response => {
        if (!response.ok) throw new Error(response.status === 403 ? 'GitHub API rate limit reached. Open the profile to browse all repositories.' : 'Could not load public repositories right now.');
        return response.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) throw new Error('GitHub returned an unexpected response. Open the profile to browse repositories.');
        const safeRepos = (data as GitHubRepo[]).filter(repo => repo && typeof repo.id === 'number' && typeof repo.name === 'string' && typeof repo.html_url === 'string' && /^https:\/\/github\.com\/yashprajapati60\//i.test(repo.html_url) && !repo.fork);
        setRepos(safeRepos);
      })
      .catch((err: Error) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const safeQuery = query.slice(0, 80).replace(/[\u0000-\u001f\u007f]/g, '').toLowerCase();
  const filtered = repos.filter(repo => `${repo.name} ${repo.description ?? ''} ${repo.language ?? ''}`.toLowerCase().includes(safeQuery));
  const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  return <section className="content-section github-section section-shell" id="github">
    <SectionHeading index="05" kicker="LIVE FROM THE REPOSITORY" title="The wider" accent="project universe."/>
    <div className="github-intro-row">
      <p className="section-intro">The resume highlights selected work. Explore more experiments, notebooks and builds directly from my public GitHub repositories. This list refreshes from GitHub when the page loads.</p>
      <a className="github-profile-link" href="https://github.com/yashprajapati60" target="_blank" rel="noreferrer"><Github size={16}/> OPEN GITHUB PROFILE <ArrowUpRight size={14}/></a>
    </div>
    <div className="github-stats-row">
      <div><b>{loading ? '—' : repos.length}</b><span>PUBLIC SOURCE REPOS</span></div>
      <div><b>{loading ? '—' : stars}</b><span>STARS ACROSS SOURCE REPOS</span></div>
      <div><b>LIVE</b><span>GITHUB API SYNC</span></div>
      <label className="repo-search"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value.slice(0, 80).replace(/[\u0000-\u001f\u007f]/g, ''))} maxLength={80} autoComplete="off" placeholder="Filter repositories…" aria-label="Filter GitHub repositories"/></label>
    </div>
    {loading && <div className="repo-state"><span className="repo-spinner"/> CONNECTING TO GITHUB REPOSITORIES…</div>}
    {!loading && error && <div className="repo-state repo-error">{error} <a href="https://github.com/yashprajapati60?tab=repositories" target="_blank" rel="noreferrer">Browse repositories <ArrowUpRight size={13}/></a></div>}
    {!loading && !error && filtered.length === 0 && <div className="repo-state">No repositories match “{query}”. Try another search.</div>}
    {!loading && !error && filtered.length > 0 && <div className="repo-grid">{filtered.map((repo, index) => <motion.a className="repo-card" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ delay: index * .045 }} whileHover={{ y: -5 }}>
      <div className="repo-card-top"><span>REPOSITORY / {String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={16}/></div>
      <h3>{repo.name.replaceAll('-', ' ')}</h3>
      <p>{repo.description || 'Public repository — open on GitHub to explore the source and project details.'}</p>
      <div className="repo-card-meta"><span>{repo.language || 'SOURCE'}</span><span><Star size={12}/> {repo.stargazers_count}</span><span><GitFork size={12}/> {repo.forks_count}</span></div>
      <small>UPDATED {new Date(repo.updated_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</small>
    </motion.a>)}</div>}
    {!loading && !error && filtered.length > 0 && <p className="repo-more-note">Showing all {filtered.length} matching public repositories. <a href="https://github.com/yashprajapati60?tab=repositories" target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={13}/></a></p>}
  </section>;
}

export default function Portfolio() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const SelectedProjectIcon = selected?.icon;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 30); const ids = ['home','about','skills','projects','research','github','experience','education','contact']; const current = ids.filter(id => { const el = document.getElementById(id); return el && el.getBoundingClientRect().top <= 150; }).pop(); if (current) setActive(current); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const nav = ['about','skills','projects','research','github','experience','education','contact'];
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <main>
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="noise"/>
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home'); }}><span className="brand-mark"><Network size={19}/></span><span>YASHKUMAR PRAJAPATI<small>AI/ML ENGINEER · PORTFOLIO</small></span></a>
      <nav className="desktop-nav">{nav.map(id => <button key={id} className={active === id ? 'nav-active' : ''} onClick={() => go(id)}>{id}</button>)}</nav>
      <div className="header-actions"><span className="availability"><i/> OPEN TO OPPORTUNITIES</span><a className="header-resume" href="/Yashkumar-Prajapati-Resume.pdf" download><Download size={14}/> RESUME</a><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button></div>
      <AnimatePresence>{menuOpen && <motion.div className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{nav.map(id => <button key={id} onClick={() => go(id)}>{id.toUpperCase()} <ArrowUpRight size={14}/></button>)}</motion.div>}</AnimatePresence>
    </header>

    <section className="hero section-shell" id="home">
      <div className="hero-grid"/>
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}><span className="eyebrow-line"/> PERSONAL PORTFOLIO <span className="eyebrow-year">2026 / 27</span></motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .18 }}>Engineering<br/><span className="gradient-text">Intelligence.</span><br/>Building what’s next<span className="blue-period">.</span></motion.h1>
        <motion.p className="hero-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .48 }}>I'M <b>YASHKUMAR PRAJAPATI</b> <span className="name-rule"/></motion.p>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .56 }}>AI/ML Engineer exploring the intersection of machine learning, deep learning and generative AI — turning complex ideas into practical systems.</motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .68 }}><button className="button-primary" onClick={() => go('projects')}>EXPLORE MY WORK <ArrowUpRight size={16}/></button><a className="button-ghost" href="/Yashkumar-Prajapati-Resume.pdf" download><Download size={15}/> DOWNLOAD CV</a></motion.div>
        <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}><a href="https://github.com/yashprajapati60" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB <ArrowUpRight size={11}/></a><a href="https://linkedin.com/in/yashkumar-prajapati-b034b9285" target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN <ArrowUpRight size={11}/></a><a href="mailto:yashkumarprajapati679@gmail.com"><Mail size={16}/> EMAIL <ArrowUpRight size={11}/></a></motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .25 }}><div className="visual-orbit orbit-a"/><div className="visual-orbit orbit-b"/><div className="visual-crosshair crosshair-a"/><div className="visual-crosshair crosshair-b"/><NeuralScene/><div className="visual-label label-top"><span>CORE SYSTEM</span><b>NEURAL NETWORK <i className="live-dot"/></b></div><div className="visual-label label-bottom"><span>LIVE VISUALIZATION</span><b>LATENT SPACE / 3D</b></div><div className="visual-coord">X 08.42&nbsp;&nbsp; Y 14.09&nbsp;&nbsp; Z 03.71</div></motion.div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span><span>AHMEDABAD, INDIA <i className="tiny-dot"/> IST (UTC +5:30)</span><span className="hero-index">01 — 09</span></div>
    </section>

    <section className="metrics-strip"><div className="metric"><span className="metric-value">9.55</span><span className="metric-label">M.TECH SPGA</span><span className="metric-note">ACADEMIC PERFORMANCE</span></div><div className="metric"><span className="metric-value">40<span>%</span></span><span className="metric-label">FASTER REPORTING</span><span className="metric-note">BUSINESS ANALYTICS IMPACT</span></div><div className="metric"><span className="metric-value">25<span>%</span></span><span className="metric-label">FEWER DOWNTIME INCIDENTS</span><span className="metric-note">MANUFACTURING ANALYTICS</span></div><div className="metric metric-context"><span className="metric-label">FOCUS AREAS</span><span className="focus-chips"><i>ML / DL</i><i>GEN AI</i><i>DATA</i><i>NLP</i></span><span className="metric-note">RESEARCH · BUILD · ITERATE</span></div></section>

    <section className="content-section section-shell" id="about"><SectionHeading index="01" kicker="THE PERSON BEHIND THE MODELS" title="A little about" accent="me."/><div className="about-layout"><div className="about-lead"><p className="large-statement">Curiosity drives the questions. <span>Engineering turns them into solutions.</span></p><p className="body-copy">I’m an AI/ML graduate currently pursuing an M.Tech in Artificial Intelligence and Machine Learning at Gandhinagar University. I work across the ML stack — from data preparation and model development to building practical applications with language models.</p><p className="body-copy">My experience spans business analytics, manufacturing data, teaching and hands-on AI projects. I enjoy translating technical work into outcomes people can use.</p><div className="about-location"><span className="location-pulse"/> BASED IN AHMEDABAD, GUJARAT, INDIA</div></div><div className="about-facts"><div className="fact-card"><span>01 / EDUCATION</span><GraduationCap/><b>M.Tech — AI & ML</b><small>Gandhinagar University · In progress</small></div><div className="fact-card"><span>02 / EXPERIENCE</span><BriefcaseBusiness/><b>Industry + Teaching</b><small>Analytics, business intelligence & education</small></div><div className="fact-card"><span>03 / APPROACH</span><BrainCircuit/><b>End-to-end thinking</b><small>Data → Models → Applications → Impact</small></div></div></div></section>

    <section className="content-section section-shell" id="skills"><SectionHeading index="02" kicker="TOOLS OF THE TRADE" title="Technical" accent="arsenal."/><p className="section-intro">A growing toolkit across machine learning, generative AI, agentic workflows, retrieval-augmented generation and data applications. Skills reflect the tools and concepts explored in the uploaded work; individual projects are labelled by scope.</p><div className="skills-grid">{skillGroups.map((group, i) => <motion.div className="skill-card" key={group.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .08 }}><div className="skill-card-head"><span>0{i + 1}</span><b>{group.label}</b><ArrowUpRight size={15}/></div><div className="skill-tags">{group.values.map(v => <span key={v}>{v}</span>)}</div></motion.div>)}</div><div className="language-row"><span>LANGUAGES</span><p>Gujarati <i>Native</i><b>/</b> Hindi <i>Native</i><b>/</b> English <i>Professional working proficiency</i></p></div></section>

    <section className="content-section projects-section section-shell" id="projects"><SectionHeading index="03" kicker="SELECTED BUILDS" title="Projects in" accent="practice."/><div className="section-topline"><p className="section-intro">A curated collection of 23 documented projects and hands-on lab modules, from machine learning and computer vision to LLM applications, AI agents and retrieval-augmented generation. Some entries are focused learning notebooks or prototypes; they are presented separately from larger application builds.</p><span>23 BUILDS & LAB MODULES · RESUME + UPLOADED SOURCE</span></div><div className="projects-grid">{projects.map((p, i) => { const Icon = p.icon; return <motion.button key={p.id} className={`project-card accent-${p.accent}`} onClick={() => setSelected(p)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: i * .07 }} whileHover={{ y: -7 }}><div className="project-card-top"><span>{p.num} / {p.type}</span><span className="project-open"><ArrowUpRight size={17}/></span></div><div className="project-art"><div className="art-grid"/><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-icon"><Icon size={35} strokeWidth={1.15}/></div><span className="art-coordinate">SYS.0{i + 1}</span></div><h3>{p.name}</h3><p>{p.summary}</p><div className="project-stack">{p.stack.map(s => <i key={s}>{s}</i>)}</div><div className="project-card-bottom"><span>VIEW PROJECT DETAILS</span><ArrowDownRight size={15}/></div></motion.button>; })}</div></section>

    <section className="content-section research-section section-shell" id="research"><SectionHeading index="04" kicker="QUESTIONS → EXPERIMENTS → INSIGHT" title="Research &" accent="publications."/><article className="publication-panel"><div className="publication-symbol"><FlaskConical size={25}/><span>01</span></div><div className="publication-copy"><div className="publication-status"><i/> PUBLISHED · REVIEW PAPER</div><h3>A Survey on Generative AI Frameworks for Data Driven Decision Making</h3><p className="publication-byline">Yashkumar Prajapati · Artificial Intelligence Department, Gandhinagar University</p><p>This review surveys GANs, VAEs, diffusion models and LLMs for data-driven decision-making, with discussion of applications across sectors and challenges including bias, hallucination, explainability, privacy, governance and human–AI collaboration.</p><div className="research-tags"><span>GENERATIVE AI</span><span>DECISION MAKING</span><span>GANs · VAEs · LLMs</span><span>HUMAN–AI COLLABORATION</span></div><div className="publication-meta">INTERNATIONAL CONFERENCE · ORGANIZED BY GANDHINAGAR UNIVERSITY</div></div><div className="publication-action"><a href="/A-Survey-Generative-AI-Decision-Making.pdf" target="_blank" rel="noreferrer">VIEW PAPER PDF <ArrowUpRight size={15}/></a><small>OPEN FULL PAPER</small></div></article><div className="research-panel"><div className="research-icon"><FlaskConical size={29}/><span className="research-orbit orbit-one"/><span className="research-orbit orbit-two"/></div><div className="research-copy"><div className="research-status"><i/> ONGOING RESEARCH · IR-I PRESENTATION / SEP 2026</div><h3>Inference-Time Visual Evidence Reliability for Robust VLM Under Image Corruption</h3><p>My current research explores how Vision-Language Models can estimate whether visual evidence is trustworthy when images are degraded by blur, noise, low resolution, occlusion, rotation, compression or spatial distortion. The direction is a lightweight inference-time reliability mechanism for frozen VLMs — helping a model decide when to trust, re-examine or avoid relying on uncertain visual evidence.</p><div className="research-tags"><span>VISION-LANGUAGE MODELS</span><span>ROBUSTNESS</span><span>VISUAL EVIDENCE RELIABILITY</span><span>INFERENCE-TIME METHODS</span><span>CALIBRATION</span></div></div><div className="research-index">RESEARCH<br/><b>IN PROGRESS</b><br/><small>IR-I · 2026</small></div></div><div className="research-detail-grid"><article className="research-detail-card"><span className="research-card-kicker">RESEARCH AIM</span><h4>Make visual evidence reliability measurable at inference time.</h4><p>Develop a lightweight mechanism intended to improve robustness and calibration while keeping the base VLM frozen.</p></article><article className="research-detail-card"><span className="research-card-kicker">KEY INVESTIGATION</span><h4>When should a VLM trust what it sees?</h4><p>Study how corruption type and severity affect model behaviour, identify unreliable visual information, and examine whether reliability signals can improve final answers.</p></article><article className="research-detail-card"><span className="research-card-kicker">PLANNED EVALUATION</span><h4>Accuracy · Robustness · Confidence</h4><p>Evaluate VLMs across different image-corruption types and levels, then compare the proposed approach with existing methods across these three dimensions.</p></article></div><details className="research-expand"><summary><span>VIEW OBJECTIVES & RESEARCH QUESTIONS</span><ChevronRight size={16}/></summary><div className="research-expand-content"><div><b>OBJECTIVES</b><ul><li>Evaluate VLM performance under different types and levels of image corruption.</li><li>Develop a lightweight mechanism to estimate visual-evidence reliability during inference.</li><li>Improve robustness and reduce incorrect or unsupported responses.</li></ul></div><div><b>RESEARCH QUESTIONS</b><ul><li>When and how do image corruptions cause VLM failures?</li><li>Can unreliable visual information be identified?</li><li>Can a model avoid relying on unreliable evidence?</li><li>Can reliability information improve the final answer without retraining the complete VLM?</li></ul></div></div></details><p className="research-footnote">The review paper above is presented as published based on the author-provided information. The uploaded PDF does not state the conference name, conference date, DOI or proceedings URL, so these details are intentionally omitted. The VLM topic below is separate ongoing research based on the IR-I presentation (September 2026).</p></section>

    <GitHubUniverse />

    <section className="content-section section-shell" id="experience"><SectionHeading index="06" kicker="THE JOURNEY SO FAR" title="Experience &" accent="impact."/><div className="timeline">{experience.map((e, i) => <motion.article className="timeline-item" key={e.org} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .1 }}><div className="timeline-marker"><span>{String(i + 1).padStart(2, '0')}</span></div><div className="timeline-content"><div className="timeline-meta"><span>{e.tag}</span><time>{e.date}</time></div><h3>{e.role}</h3><h4>{e.org} <span>· {e.place}</span></h4><p>{e.desc}</p>{e.metrics && <div className="impact-list">{e.metrics.map(m => <span key={m}><Check size={13}/>{m}</span>)}</div>}</div></motion.article>)}</div></section>

    <section className="content-section section-shell" id="education"><SectionHeading index="07" kicker="LEARNING NEVER STOPS" title="Education &" accent="credentials."/><div className="education-grid"><div className="education-card current"><div className="edu-top"><span>01 / POSTGRADUATE</span><span className="edu-status"><i/> IN PROGRESS</span></div><GraduationCap size={27}/><h3>M.Tech</h3><h4>Artificial Intelligence and Machine Learning</h4><p>Gandhinagar University</p><div className="edu-bottom"><span>AUG 2025 — SEP 2027</span><b>SPGA <strong>9.55</strong></b></div></div><div className="education-card"><div className="edu-top"><span>02 / UNDERGRADUATE</span><span>COMPLETED</span></div><GraduationCap size={27}/><h3>B.E.</h3><h4>Information Technology</h4><p>Apollo Institute of Engineering and Technology</p><div className="edu-bottom"><span>NOV 2021 — MAY 2025</span><b>CGPA <strong>8.20</strong></b></div></div></div><div className="certifications"><span className="cert-title">CERTIFICATIONS</span><div><b>LangChain Essentials — Python</b><small>LangChain Academy · Feb 2026</small></div><div><b>Gemini Certified Student</b><small>Google · Dec 2025</small></div><div><b>Data Science Training</b><small>FINGERTIPS</small></div></div></section>

    <section className="content-section terminal-section section-shell" id="terminal"><SectionHeading index="08" kicker="A DIFFERENT WAY TO EXPLORE" title="Talk to the" accent="terminal."/><p className="section-intro">Prefer the command line? Explore the portfolio through a small interactive shell. Try <code>help</code>, <code>projects</code> or <code>skills</code>.</p><TerminalPanel/></section>

    <section className="contact-section section-shell" id="contact"><div className="contact-grid"/><div className="contact-kicker"><span/> INITIATE CONNECTION / 09</div><h2>Have a problem<br/>worth <span>solving?</span></h2><p>I'm open to opportunities where I can contribute to AI/ML engineering, data-driven products and intelligent applications.</p><a className="contact-email" href="mailto:yashkumarprajapati679@gmail.com">yashkumarprajapati679@gmail.com <ArrowUpRight size={20}/></a><div className="contact-links"><a href="https://linkedin.com/in/yashkumar-prajapati-b034b9285" target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN <ExternalLink size={12}/></a><a href="https://github.com/yashprajapati60" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB <ExternalLink size={12}/></a><a href="/Yashkumar-Prajapati-Resume.pdf" download><Download size={16}/> RESUME PDF</a></div></section>

    <footer className="site-footer"><a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home'); }}><span className="brand-mark"><Network size={17}/></span><span>YASHKUMAR PRAJAPATI<small>AI/ML ENGINEER · PORTFOLIO</small></span></a><span>DESIGNED & BUILT WITH CURIOSITY.</span><span>© {new Date().getFullYear()} YASHKUMAR PRAJAPATI</span></footer>
    <button className="terminal-fab" onClick={() => { setTerminalOpen(!terminalOpen); if (!terminalOpen) setTimeout(() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' }), 50); }} aria-label="Jump to interactive terminal"><Command size={17}/><span>OPEN TERMINAL</span></button>
    <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="project-modal" initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }} onClick={e => e.stopPropagation()}><div className="modal-head"><span>PROJECT / {selected.num} — {selected.type}</span><button onClick={() => setSelected(null)} aria-label="Close project details"><X/></button></div><div className="modal-visual">{SelectedProjectIcon && <SelectedProjectIcon size={55} strokeWidth={1}/>}<span>PROJECT MODULE // {selected.id.toUpperCase()}</span></div><h2>{selected.name}</h2><p>{selected.detail}</p><div className="modal-stack">{selected.stack.map(s => <span key={s}>{s}</span>)}</div><div className="modal-note">PROJECT SUMMARY BASED ON RESUME OR UPLOADED SOURCE <span>● SOURCE REVIEWED</span></div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}

function SectionHeading({ index, kicker, title, accent }: { index: string; kicker: string; title: string; accent: string }) {
  return <div className="section-heading"><div className="section-heading-meta"><span>{index} / 09</span><i/><span>{kicker}</span></div><h2>{title} <span>{accent}</span></h2></div>;
}
