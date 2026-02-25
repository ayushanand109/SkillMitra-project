# SkillMitra - AI-Powered Skill Swapping Platform

A beautiful and modern React application that enables peer-to-peer skill swapping through AI-powered matching and recommendations.

## 🚀 Features

### 🔐 Authentication
- **Login/Signup**: Email/password and Google OAuth integration
- **Secure Sessions**: JWT-based authentication with persistent sessions
- **Anonymous Mode**: Browse and chat privately with pseudonym

### 🎯 AI-Powered Matching
- **Smart Recommendations**: AI algorithms match users based on skill compatibility
- **Compatibility Scores**: Percentage-based matching with common skills highlighted
- **Skill Correlation**: Related skill suggestions based on user's current abilities

### 📊 Progress Tracking
- **GitHub-style Heatmap**: Visual activity tracking with daily contributions
- **Learning Streaks**: Gamified progress with streak counters
- **Skill Pathways**: AI-generated learning paths from current to desired skills

### 🏆 Gamification
- **Points System**: Earn points for teaching, learning, and completing challenges
- **Badges & Achievements**: Unlock rewards for various accomplishments
- **Level Progression**: Visual level system with progress bars
- **Leaderboards**: Community rankings with different timeframes

### 💬 Real-time Communication
- **Anonymous Chat**: WebSocket-powered chat with identity protection
- **Mentorship Mode**: Connect with experts while maintaining privacy
- **Study Groups**: Join topic-based chat rooms

### 🎮 Micro-Challenges
- **AI-Generated Tasks**: Personalized coding and skill challenges
- **Difficulty Levels**: Easy, Medium, and Hard challenges with point rewards
- **Time Limits**: Gamified learning with countdown timers
- **Community Participation**: See how many others are taking each challenge

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Dark Mode Ready**: Color system designed for future dark mode implementation

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Build Tool**: Vite for fast development and building
- **Fonts**: Inter and Poppins from Google Fonts

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd major_pro
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

## 🎯 Getting Started

1. **Sign Up**: Create an account or use the demo login
2. **Complete Profile**: Add your skills and learning goals
3. **Explore Dashboard**: Check out AI recommendations and your progress
4. **Connect**: Find and connect with skill mentors
5. **Learn**: Take challenges and join chat rooms
6. **Teach**: Share your knowledge and earn points

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── dashboard/      # Dashboard widgets
│   └── ui/             # Common UI elements
├── context/            # React Context providers
├── data/               # Mock data and constants
├── pages/              # Page-level components
├── utils/              # Helper functions
└── App.jsx             # Main application component
```

## 🎨 Design System

### Colors
- **Primary**: Blue tones for main actions and branding
- **Accent**: Purple tones for secondary actions and highlights
- **Success**: Green for positive actions and achievements
- **Warning**: Yellow/Orange for cautions and medium difficulty
- **Danger**: Red for errors and hard difficulty

### Typography
- **Headings**: Poppins font family for display text
- **Body**: Inter font family for readable content
- **Consistent scale**: Using Tailwind's type scale

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Primary, secondary, and accent variants
- **Forms**: Consistent input styling with focus states
- **Badges**: Color-coded skill and difficulty indicators

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🌟 Key Features Demonstrated

### AI-Powered Recommendations
The platform simulates AI algorithms that:
- Calculate compatibility scores between users
- Suggest learning paths based on skill correlations
- Generate personalized challenges
- Recommend related skills to learn

### Gamification Elements
- **Points System**: Earn points for various activities
- **Badge System**: Unlock achievements for milestones
- **Progress Tracking**: Visual progress with heatmaps and charts
- **Leaderboards**: Community competition and recognition

### Real-time Features
- **Live Chat**: WebSocket simulation for instant messaging
- **Online Status**: See who's currently active
- **Activity Feeds**: Real-time updates on community activities

## 🎭 Mock Data & Simulation

The application uses sophisticated mock data to simulate a fully functional backend:
- **User Profiles**: Realistic user data with skills and preferences
- **Activity Data**: Generated heatmap data for progress tracking
- **Chat Messages**: Simulated real-time conversations
- **Challenge Data**: Varied difficulty levels and skill requirements

## 🚀 Deployment

The application is ready for deployment to platforms like:
- **Vercel**: Zero-config deployment for Vite/React apps
- **Netlify**: Continuous deployment with Git integration
- **GitHub Pages**: Free hosting for static sites

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern SaaS applications and learning platforms
- **Icons**: Lucide React for beautiful, consistent icons
- **Fonts**: Google Fonts for typography
- **Colors**: Tailwind CSS color palette as foundation

---

Built with ❤️ for the future of skill sharing and peer-to-peer learning.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
