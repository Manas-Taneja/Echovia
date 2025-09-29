# Echovia 🌸

A gentle, privacy-focused breast health awareness application that helps you stay connected to your body through monthly self-checks, daily logging, and educational resources.

## 🌟 Features

### 🔐 Secure Authentication
- Simple PIN-based authentication (demo PIN: `1234`)
- Privacy-first design with local data storage
- No cloud dependencies - your data stays on your device

### 📅 Monthly Check-ins
- **Guided Self-Examination**: Step-by-step process covering all four breast quadrants
- **Symptom Tracking**: Log tenderness, swelling, pain, or normal sensations
- **Personal Notes**: Add context and observations
- **Smart Reminders**: Automatic tracking of when your next check-in is due

### 📊 Daily Health Hub
- **Quick Logging**: One-tap logging for daily sensations (feeling good, tenderness, fatigue, notes)
- **Tip of the Day**: Rotating health tips and gentle reminders
- **Progress Tracking**: Visual indicators for monthly check-in status

### 📚 Knowledge Center
- **Educational Articles**: Gentle guides on breast health, self-examination, and healthy habits
- **Categorized Content**: Browse by topics like "Exam Guides", "Understanding Your Body", and "Healthy Lifestyle"
- **Search Functionality**: Find specific information quickly

### 📈 Health Timeline
- **Calendar View**: Visual timeline of your check-ins with color-coded results
- **Historical Data**: Review past entries and track patterns over time
- **Interactive Details**: Tap any date to see detailed check-in information

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Echovia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### First Time Setup

1. **Welcome Screen**: Swipe up on the gradient control to begin
2. **Authentication**: Enter the demo PIN `1234` to access the app
3. **Start Your Journey**: Complete your first monthly check-in from the Today Hub

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

### Tech Stack

- **Framework**: React Router v7 with SSR
- **Styling**: Tailwind CSS with custom glass morphism effects
- **Language**: TypeScript
- **Build Tool**: Vite
- **PWA**: Service worker support for offline functionality

### Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── buttons.tsx     # Glass morphism buttons
│   ├── cards.tsx       # Glass morphism cards
│   ├── GlassNav.tsx    # Navigation component
│   └── ProtectedRoute.tsx # Authentication guard
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── knowledge/          # Educational content
│   └── data.ts        # Knowledge articles and categories
├── routes/            # Application pages
│   ├── home.tsx       # Daily hub dashboard
│   ├── checkin.tsx    # Monthly check-in flow
│   ├── knowledge.tsx  # Knowledge center
│   ├── timeline.tsx   # Health timeline calendar
│   └── login.tsx      # PIN authentication
└── root.tsx           # App layout and providers
```

## 🔒 Privacy & Data

- **Local Storage Only**: All data is stored locally in your browser
- **No Cloud Sync**: Your health information never leaves your device
- **No Tracking**: No analytics or user tracking
- **Secure by Design**: PIN-based authentication with no external dependencies

## 📱 Progressive Web App

Echovia is built as a Progressive Web App (PWA), which means:

- **Installable**: Add to your home screen like a native app
- **Offline Support**: Works without internet connection
- **Mobile Optimized**: Responsive design for all screen sizes
- **Fast Loading**: Optimized for quick startup times

## 🎨 Design Philosophy

- **Gentle & Calming**: Soft colors and smooth animations
- **Glass Morphism**: Modern, translucent UI elements
- **Accessibility First**: Screen reader friendly and keyboard navigable
- **Mobile-First**: Designed primarily for mobile use

## 🚢 Deployment

### Docker Deployment

```bash
# Build the Docker image
docker build -t echovia .

# Run the container
docker run -p 3000:3000 echovia
```

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build/` directory to your hosting platform

3. Ensure your server serves the `build/client/` directory for static assets

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Medical Disclaimer

**Important**: Echovia is an educational tool and awareness application. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include your browser and device information

---

**Built with ❤️ for women's health awareness**

*Remember: Your health journey is personal and important. Take care of yourself, and don't hesitate to reach out to healthcare professionals when needed.*