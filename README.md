# Yashkumar Prajapati — AI/ML Engineer Portfolio

A high-interactivity AI/ML portfolio built with Next.js, TypeScript, React Three Fiber, Three.js and Framer Motion.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer (or a compatible package manager)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Portfolio experience

- 3D neural-network visualization with orbit controls and animated nodes
- Responsive navigation with active-section tracking
- Animated section entrances and hover-responsive project cards
- Project detail modal for each documented project or lab module
- Skills grouped across programming, ML/CV, generative and agentic AI, RAG/vector search, LLM application development, data visualization and tools
- Research & Publications section separates one published review paper from one ongoing VLM research project
- Published review-paper PDF included in `public/A-Survey-Generative-AI-Decision-Making.pdf`
- Resume PDF included in `public/Yashkumar-Prajapati-Resume.pdf`
- Live GitHub Project Universe: loads public, non-fork repositories from the GitHub REST API, with repository search, language, stars, forks and last-updated details
- Interactive terminal commands: `help`, `about`, `skills`, `agentic`, `rag`, `labs`, `projects`, `github`, `research`, `papers`, `experience`, `education`, `contact`, `resume`, `clear`
- Direct GitHub, LinkedIn and email links
- No sound effects

## Project inventory represented in the portfolio

### Resume-featured projects

1. Fine-Tuned Phi-3 Mini LLM — structured product-information extraction from raw HTML using Unsloth, LoRA and Hugging Face TRL.
2. Chatbot with Ollama3 — local-LLM chatbot using LangChain, Ollama, LangServe and Streamlit.
3. Handwritten Digit Recognition — MNIST CNN using TensorFlow/Keras.
4. SMS Spam Classifier — TF-IDF/CountVectorizer and multiple scikit-learn models.
5. Transfer Learning with VGG16 — ImageNet-pretrained VGG16 experiments on Fashion MNIST.

### Uploaded LangChain / LLM notebooks and Python applications

6. LangChain model integrations (Gemini and Groq-hosted OpenAI-compatible model connections; the notebook also contains an Anthropic connection heading).
7. Prompt templates and LCEL chains, including output parsing and text transformation.
8. Conversational memory and chat-history management.
9. Structured output extraction using Pydantic schemas.
10. Local LLM runtime experiments with Ollama, Gemma 3 1B and DeepSeek-R1 7B.
11. Groq model integration with LangChain.
12. Streaming LLM responses.
13. Basic tool-calling math agent with custom addition and multiplication tools.
14. Google Search AI agent using Google Serper, Groq and LangGraph checkpoint memory.
15. Multi-source document loading for text, PDF, CSV, web pages and Wikipedia.
16. Recursive text/document splitting with configurable chunk size and overlap.
17. Qwen3 Embeddings (0.6B) with Ollama and Chroma similarity search.
18. PDF-based RAG question-answering over the Nagar AI Gujarat implementation book.
19. RAG retrieval agent using a custom document-retriever tool and an in-memory vector store.
20. Gemini-powered Streamlit Q&A chatbot with session chat history.
21. Command-line Google Search agent using Groq, Serper and MemorySaver.
22. Streamlit Groq search chatbot with agent checkpointing and streamed responses.
23. SQL Task Management AI Agent using SQLite, LangChain SQLDatabaseToolkit, Streamlit and LangGraph memory; its documented task workflow includes create/read/update/delete rules and safeguards.

The 23 entries are a presentation inventory: 5 projects from the resume plus 14 notebook modules and 4 Python application scripts. Some notebooks and scripts explore the same family of functionality at different stages. Small learning modules are explicitly labelled as notebooks or prototypes and are not represented as production deployments.

## Skills and positioning

The portfolio includes the user's newly supplied areas of working knowledge: Agentic AI concepts, AI agents and RAG concepts. Uploaded source code also demonstrates hands-on exploration of LangChain, LangGraph checkpointers, tool calling, prompt templates, LCEL chains, Pydantic structured output, streaming, Google Serper search, document ingestion, recursive chunking, embeddings, Chroma vector search, PDF RAG, retrieval tools and SQL agents. The portfolio does not assign unverified proficiency ratings.

## Research

- Published review paper: **A Survey on Generative AI Frameworks for Data Driven Decision Making** — Yashkumar Prajapati, Artificial Intelligence Department, Gandhinagar University. The author supplied the international-conference context and organizer (Gandhinagar University). The PDF does not state the exact conference name, date, DOI or proceedings URL; these details are intentionally omitted.
- Ongoing research: **Inference-Time Visual Evidence Reliability for Robust VLM Under Image Corruption** — based on the uploaded IR-I presentation (September 2026). This is marked as ongoing, not as a published paper.

## GitHub repository listing

The GitHub section reads public repository metadata live from `https://api.github.com/users/yashprajapati60/repos` and displays all returned non-fork repositories with search/filtering. The API is unauthenticated and subject to GitHub rate limits. If it fails, visitors can still open the full GitHub profile directly.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Deploy. The resume PDF is served from `/Yashkumar-Prajapati-Resume.pdf`.

## Project structure

```text
app/
  components/
    NeuralScene.tsx
    Portfolio.tsx
  globals.css
  layout.tsx
  page.tsx
public/
  Yashkumar-Prajapati-Resume.pdf
  A-Survey-Generative-AI-Decision-Making.pdf
```


## Security measures

This is a public-facing portfolio with no login, database, contact-form backend or user-upload feature. The GitHub repository filter runs locally in the browser; it does not execute search queries on a server, evaluate user input, or send filter text to GitHub. The only live data request is a read-only request to the fixed public GitHub API endpoint for this profile.

The application configures HTTP security headers in `next.config.ts`: Content Security Policy, HSTS, clickjacking protection, MIME-sniffing protection, a restrictive referrer policy, Permissions Policy, and cross-origin isolation-related policies. The `X-Powered-By` header is disabled. Search and terminal inputs are length-limited; the GitHub response is checked before repository links are rendered; external links use `rel="noreferrer"`.

### Deployment security checklist

- Deploy behind HTTPS on a maintained hosting provider (for example, Vercel) and keep the domain/DNS account protected with MFA.
- Keep dependencies updated; run `npm audit` and review/fix reported vulnerabilities before releases. Do not blindly force-upgrade major versions.
- Do not add API keys, tokens, passwords, private data or `.env` files to the repository or browser code. If a future server-side integration needs secrets, store them only as hosting-provider environment variables and never prefix them with `NEXT_PUBLIC_`.
- Protect the GitHub account with MFA/passkeys and enable repository secret scanning / push protection where available.
- Review production logs and hosting alerts; rebuild and redeploy promptly when Next.js or dependencies publish security fixes.
- If adding forms, authentication, APIs, uploads or a database later, add server-side validation, CSRF protections where applicable, rate limiting, authorization checks, safe file handling and abuse monitoring before launch.

**Security limitation:** no website can be guaranteed impossible to hack. These controls reduce common risks, but they do not replace secure hosting, dependency maintenance, account security, monitoring or a professional security review. The current site intentionally has no backend search endpoint or arbitrary query execution.
