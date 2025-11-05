# LearnLens MVP - Complete Implementation

Transform documents into interactive video playlists with AI-powered content generation.

## 🚀 Features Implemented

### Core Features
✅ **PDF/TXT Upload** - Drag & drop file upload with validation  
✅ **AI Outline Generation** - Gemini creates structured learning topics  
✅ **Video Generation** - Veo 3.1 creates educational videos  
✅ **Async Processing** - Non-blocking background video creation  
✅ **Status Tracking** - Real-time video generation progress  

### Business Features
✅ **Freemium Model** - First video free, others premium  
✅ **Subscription UI** - Subscribe buttons on premium videos  
✅ **Value Preview** - Show all topics users would get  

### Technical Features
✅ **Modern UI** - Responsive design with animations  
✅ **Dark/Light Theme** - Theme toggle with system preference  
✅ **Error Handling** - File validation and API error management  
✅ **Full-Stack Integration** - React frontend + FastAPI backend  

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + Radix UI components
- Motion (Framer Motion) for animations
- Lucide React icons

**Backend:**
- FastAPI with async support
- Google Gemini AI for outline generation
- Google Veo for video generation
- In-memory storage (replace with database)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- Gemini API key
- Veo API key (optional for demo)

### Frontend Setup
```bash
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your API keys

python main.py
```

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ProcessingDashboard.tsx    # Main dashboard
│   │   ├── SubscriptionModal.tsx      # Premium upgrade
│   │   ├── VideoPlayer.tsx            # Video playback
│   │   ├── ThemeToggle.tsx            # Dark/light mode
│   │   └── UploadSection.tsx          # File upload
│   ├── services/
│   │   └── api.ts                     # Backend integration
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   └── hooks/
│       └── useTheme.ts                # Theme management
├── backend/
│   ├── main.py                        # FastAPI server
│   ├── requirements.txt               # Python dependencies
│   └── .env.example                   # Environment template
```

## 🔄 User Flow

1. **Upload Document** → Drag & drop PDF/TXT file
2. **AI Analysis** → Gemini generates structured outline
3. **First Video** → Free video generates automatically
4. **Premium Gate** → Other videos require subscription
5. **Subscribe** → Unlock all videos and features

## 🎯 API Endpoints

- `POST /upload` - Upload and process document
- `GET /documents/{id}` - Get document outline and status
- `POST /generate-video` - Generate video for topic
- `GET /videos/{id}` - Get video generation status
- `GET /subscription` - Check user subscription
- `POST /subscribe` - Handle subscription

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
```
VITE_API_URL=http://localhost:8000
```

**Backend (backend/.env):**
```
GEMINI_API_KEY=your_gemini_api_key
VEO_API_KEY=your_veo_api_key
```

## 🎨 UI Components

- **ProcessingDashboard** - Shows document outline with video status
- **SubscriptionModal** - Premium upgrade with pricing
- **VideoPlayer** - Custom video player with controls
- **ThemeToggle** - Dark/light mode switcher
- **UploadSection** - Enhanced file upload with progress

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Heroku)
```bash
# Deploy backend/ folder
# Set environment variables
```

## 🔮 Next Steps

1. **Database Integration** - Replace in-memory storage
2. **Payment Processing** - Stripe/PayPal integration
3. **User Authentication** - JWT/OAuth implementation
4. **Video Storage** - AWS S3/CloudFlare R2
5. **Analytics** - Usage tracking and metrics

## 📝 License

MIT License - see LICENSE file for details.