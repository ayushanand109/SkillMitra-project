import clsx from 'clsx';

// Utility function for combining classes
export function cn(...inputs) {
  return clsx(inputs);
}

// Format date for display
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Format time for display
export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Calculate days ago
export function getDaysAgo(date) {
  const now = new Date();
  const target = new Date(date);
  const diffTime = Math.abs(now - target);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Get difficulty color classes
export function getDifficultyClass(difficulty) {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'difficulty-easy';
    case 'medium':
      return 'difficulty-medium';
    case 'hard':
      return 'difficulty-hard';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Calculate skill compatibility score
export function calculateCompatibility(userSkills, targetSkills) {
  const intersection = userSkills.filter(skill => 
    targetSkills.some(target => 
      target.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(target.toLowerCase())
    )
  );
  
  const union = [...new Set([...userSkills, ...targetSkills])];
  return Math.round((intersection.length / union.length) * 100);
}

// Generate random avatar color
export function getAvatarColor(name) {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500'
  ];
  
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format points with K notation
export function formatPoints(points) {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}

// Get level progress percentage
export function getLevelProgress(points) {
  const pointsPerLevel = 500;
  const currentLevelPoints = points % pointsPerLevel;
  return (currentLevelPoints / pointsPerLevel) * 100;
}

// Calculate user level from points
export function calculateLevel(points) {
  return Math.floor(points / 500) + 1;
}

// Generate initials from name
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate skill recommendations based on user's current skills
export function getSkillRecommendations(currentSkills, allSkills) {
  const recommendations = [];
  const skillMap = {
    'React': ['Next.js', 'TypeScript', 'Redux', 'React Native'],
    'JavaScript': ['TypeScript', 'Node.js', 'Vue.js', 'Angular'],
    'Python': ['Django', 'Flask', 'FastAPI', 'Machine Learning'],
    'CSS': ['Sass', 'Tailwind CSS', 'Animation', 'CSS-in-JS'],
    'HTML': ['SEO', 'Accessibility', 'Web Components', 'Progressive Web Apps']
  };

  currentSkills.forEach(skill => {
    if (skillMap[skill]) {
      recommendations.push(...skillMap[skill]);
    }
  });

  return [...new Set(recommendations)].slice(0, 5);
}
