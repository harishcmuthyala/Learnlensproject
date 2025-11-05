# Main Page Design - LearnLens MVP

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
- React 18 + Vite
- Tailwind CSS + Radix UI components
- Motion for animations
- Lucide React icons
- Comprehensive UI component library

**Backend:**
- FastAPI with async support
- Google Gemini AI for outline generation
- Google Veo for video generation
- PyPDF2 for PDF processing
- python-docx for Word documents
- In-memory storage (replace with database)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- Gemini API key
- Veo API key (optional for demo)

### Setup
```bash
# Install frontend dependencies
npm install

# Start frontend
npm run dev

# Start backend (in separate terminal)
npm run backend
```

### Manual Backend Setup
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
│   │   ├── ui/                        # Radix UI components
│   │   ├── figma/                     # Figma components
│   │   ├── HeroSection.tsx            # Landing page hero
│   │   ├── FeaturesSection.tsx        # Features showcase
│   │   ├── HowItWorksSection.tsx      # Process explanation
│   │   ├── Navigation.tsx             # Site navigation
│   │   ├── SampleVideosSection.tsx    # Video samples
│   │   ├── ProcessingDashboard.tsx    # Main dashboard
│   │   ├── SubscriptionModal.tsx      # Premium upgrade
│   │   ├── VideoPlayer.tsx            # Video playback
│   │   ├── ThemeToggle.tsx            # Dark/light mode
│   │   └── UploadSection.tsx          # File upload
│   ├── services/
│   │   └── api.ts                     # Backend integration
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   ├── hooks/
│   │   └── useTheme.ts                # Theme management
│   ├── styles/
│   │   └── globals.css                # Global styles
│   └── guidelines/
│       └── Guidelines.md              # Design guidelines
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

### Main Components
- **HeroSection** - Landing page hero with call-to-action
- **FeaturesSection** - Feature highlights and benefits
- **HowItWorksSection** - Step-by-step process explanation
- **Navigation** - Site navigation with theme toggle
- **SampleVideosSection** - Showcase of generated videos
- **ProcessingDashboard** - Document outline with video status
- **SubscriptionModal** - Premium upgrade with pricing
- **VideoPlayer** - Custom video player with controls
- **UploadSection** - Enhanced file upload with progress

### UI Library
- Complete Radix UI component set (40+ components)
- Custom styled components with Tailwind CSS
- Responsive design patterns

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