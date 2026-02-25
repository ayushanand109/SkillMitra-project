<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SkillMitra - AI-Powered Skill Swapping Platform

## Project Overview
SkillMitra is a React-based frontend application for an AI-powered skill swapping platform. It enables peer-to-peer skill sharing by matching users based on their known skills and learning goals.

## Tech Stack
- **Frontend**: React 18 (functional components with hooks)
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Architecture Guidelines

### Component Structure
- Use functional components with React hooks
- Keep components modular and reusable
- Follow the folder structure:
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page-level components
  - `src/context/` - React Context providers
  - `src/utils/` - Helper functions and utilities
  - `src/data/` - Mock data and constants

### Styling Guidelines
- Use Tailwind CSS classes for all styling
- Follow the custom design system defined in `tailwind.config.js`
- Use custom CSS classes defined in `index.css` for common patterns
- Maintain consistent spacing, colors, and typography
- Ensure responsive design for mobile and desktop

### State Management
- Use React Context for global state (auth, user data)
- Use local state with useState for component-specific data
- Use useEffect for side effects and data fetching

### Code Quality
- Write clean, readable, and well-commented code
- Follow consistent naming conventions
- Ensure accessibility with proper ARIA attributes
- Handle loading and error states appropriately
- Use TypeScript-like JSDoc comments for better IntelliSense

### Key Features Implemented
1. **Authentication System**: Login/signup with mock OAuth
2. **Dashboard**: AI skill matches, progress heatmap, leaderboard
3. **Skill Management**: Add/remove skills, skill mapping
4. **Gamification**: Points, badges, levels, achievements
5. **Real-time Chat**: Anonymous chat with WebSocket simulation
6. **Challenges**: AI-powered micro-challenges with difficulty levels
7. **Profile Management**: Edit profile, manage skills, privacy settings

### Design Principles
- Modern, clean UI with smooth animations
- Accessible design with proper contrast ratios
- Mobile-first responsive design
- Consistent color palette with primary, accent, and semantic colors
- Beautiful gradients and subtle shadows for depth
- Interactive elements with hover and focus states

## Development Notes
- Mock data is used to simulate backend responses
- WebSocket connections are simulated for chat functionality
- All API calls are mocked with setTimeout for realistic loading states
- The application is fully functional without a backend
