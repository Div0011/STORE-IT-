# 🔐 STORE IT! - AI-Powered Secure Document Storage

<div align="center">

![STORE IT! Banner](https://img.shields.io/badge/STORE_IT!-AI_Powered_Storage-8B2635?style=for-the-badge)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

**A revolutionary document storage platform combining military-grade encryption, distributed architecture, and cutting-edge AI analysis.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 🔒 **Security First**
- **Zero-Knowledge Encryption**: Your data is encrypted before it leaves your device
- **File Sharding**: Documents split into encrypted shards across multiple nodes
- **Distributed Architecture**: No single point of failure
- **End-to-End Encryption**: Industry-standard AES-256 encryption

### 🧠 **AI-Powered Intelligence**
- **Smart Document Analysis**: Powered by Google Gemini 2.5 Flash
- **Automatic Classification**: Identifies document types (IDs, invoices, contracts, etc.)
- **PII Detection**: Automatically detects and flags sensitive information
- **Semantic Search**: RAG-powered intelligent document querying
- **Auto-Tagging**: AI-generated tags for easy organization

### 💎 **Premium Features**
- **Vault Chat**: Ask questions about your documents using natural language
- **Real-Time OCR**: Extract text from images and scanned PDFs
- **Sensitivity Scoring**: Automatic risk assessment (1-5 scale)
- **Smart Deduplication**: Prevents duplicate uploads using semantic similarity
- **Interactive Insights**: Detailed AI analysis for every document

### 🎨 **Modern UI/UX**
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glassmorphism**: Modern, premium design aesthetic
- **Smooth Animations**: Framer Motion powered interactions
- **Toast Notifications**: Real-time feedback for all actions

---

## 🚀 Demo

### Screenshots

#### Main Dashboard
![Dashboard](docs/screenshots/dashboard.png)

#### AI Insights Panel
![AI Insights](docs/screenshots/ai-insights.png)

#### Vault Chat
![Vault Chat](docs/screenshots/vault-chat.png)

---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Div0011/STORE-IT-.git
cd STORE-IT-
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 5: Start the Backend Server

```bash
python -m brain_engine.gateway
```

The backend will run on `http://localhost:8000`

### Step 6: Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

---

## 🎯 Usage

### Uploading Files

1. Click the **"UPLOAD_GENESIS"** button or the floating **+** button
2. Select your file (supports PDF, images, documents)
3. Wait for AI analysis to complete
4. View AI-generated insights in the toast notification

### Viewing AI Insights

1. Click on any file card in your dashboard
2. The **AI Insights** panel will slide in from the right
3. View:
   - AI-generated summary
   - Document type classification
   - PII detection results
   - Sensitivity level
   - Smart tags

### Using Vault Chat

1. Click **"Vault Chat"** in the sidebar
2. Ask questions about your documents in natural language
3. The AI will search through your vault and provide answers
4. Referenced documents are shown for transparency

### Managing Files

- **Rescan**: Click "RESCAN WITH AI" to re-analyze a document
- **Delete**: Click "DELETE FILE" to permanently remove a document
- **Download**: Download the original file
- **Share**: Share document access (coming soon)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 7.3** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Google Generative AI** - Gemini 2.5 Flash
- **PyPDF2** - PDF processing

### AI & ML
- **Google Gemini 2.5 Flash** - Document analysis, OCR, RAG
- **Semantic Similarity** - Duplicate detection
- **Vector Embeddings** - Intelligent search

### Storage
- **File Sharding** - Custom implementation
- **JSON Database** - Lightweight document indexing
- **Distributed Nodes** - Multi-node architecture

---

## 📁 Project Structure

```
STORE-IT-/
├── src/                          # Frontend source
│   ├── components/               # React components
│   │   ├── Sidebar.jsx
│   │   ├── FileInsights.jsx
│   │   ├── VaultChat.jsx
│   │   ├── ToastContainer.jsx
│   │   └── Footer.jsx
│   ├── pages/                    # Page components
│   │   └── PrivacyPolicy.jsx
│   ├── App.jsx                   # Main app component
│   └── index.css                 # Global styles
├── brain_engine/                 # Backend AI engine
│   ├── gateway.py                # FastAPI server
│   ├── intelligent_worker.py     # AI processing
│   ├── vault_chat_engine.py      # RAG implementation
│   ├── ocr_redaction.py          # OCR & analysis
│   └── file_shredder.py          # File sharding
├── vault_data/                   # Encrypted file storage
│   ├── Node-1/
│   ├── Node-2/
│   └── ...
├── .env                          # Environment variables
├── package.json                  # Frontend dependencies
├── requirements.txt              # Backend dependencies
└── README.md                     # This file
```

---

## 🔐 Security

### Encryption
- All files are encrypted using **AES-256** before storage
- Encryption keys are never stored on our servers
- **Zero-knowledge architecture** ensures we cannot access your data

### File Sharding
- Files are split into multiple encrypted shards
- Shards are distributed across 5 secure nodes
- 3x replication factor for redundancy
- Consistent hashing for efficient retrieval

### PII Protection
- Automatic detection of sensitive information
- Optional redaction service
- Sensitivity scoring for risk assessment

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Made with ❤️ by DIVYANSH AWASTHI™**

- GitHub: [@Div0011](https://github.com/Div0011)
- LinkedIn: [Divyansh Awasthi](https://linkedin.com/in/divyansh-awasthi)
- Email: contact@divyanshawasthi.com

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the intelligent features
- **React Team** for the amazing framework
- **FastAPI** for the blazing-fast backend
- **TailwindCSS** for the beautiful styling system

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Div0011/STORE-IT-?style=social)
![GitHub forks](https://img.shields.io/github/forks/Div0011/STORE-IT-?style=social)
![GitHub issues](https://img.shields.io/github/issues/Div0011/STORE-IT-)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Div0011/STORE-IT-)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with 🧠 and ❤️ in India

</div>
