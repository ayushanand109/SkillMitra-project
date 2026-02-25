// Mock data for SkillMitra application

export const mockUsers = [
  {
    id: 1,
    name: "Alex Chen",
    pseudonym: "CodeWizard",
    jobTitle: "Full Stack Developer",
    skillsKnown: ["React", "Node.js", "Python", "AWS", "Docker"],
    skillsToLearn: ["Machine Learning", "Kubernetes", "GraphQL", "TypeScript"],
    points: 2450,
    level: 8,
    badges: ["Teacher", "Learner", "Collaborator", "Problem Solver"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    pseudonym: "DesignMaven",
    jobTitle: "UX Designer",
    skillsKnown: ["Figma", "Adobe XD", "UI/UX Design", "Prototyping", "User Research"],
    skillsToLearn: ["React", "CSS", "Animation", "JavaScript"],
    points: 1890,
    level: 6,
    badges: ["Creative", "Mentor", "Innovator"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    pseudonym: "DataNinja",
    jobTitle: "Data Scientist",
    skillsKnown: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
    skillsToLearn: ["React", "D3.js", "MongoDB", "Apache Spark"],
    points: 3120,
    level: 10,
    badges: ["Expert", "Mentor", "Data Wizard", "Algorithm Master"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Emily Watson",
    pseudonym: "CloudQueen",
    jobTitle: "DevOps Engineer",
    skillsKnown: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
    skillsToLearn: ["React", "Go", "Monitoring", "Security"],
    points: 2780,
    level: 9,
    badges: ["Infrastructure Expert", "Automation Pro", "Cloud Master"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b820?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockMatches = [
  {
    userId: 2,
    name: "Sarah Johnson",
    pseudonym: "DesignMaven",
    compatibilityScore: 85,
    commonSkills: ["UI/UX Design", "Prototyping"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    canTeach: ["Figma", "Adobe XD", "User Research"],
    wantsToLearn: ["React", "CSS", "JavaScript"]
  },
  {
    userId: 3,
    name: "Michael Rodriguez",
    pseudonym: "DataNinja",
    compatibilityScore: 78,
    commonSkills: ["Python", "Machine Learning"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    canTeach: ["TensorFlow", "Pandas", "SQL"],
    wantsToLearn: ["React", "D3.js", "MongoDB"]
  },
  {
    userId: 4,
    name: "Emily Watson",
    pseudonym: "CloudQueen",
    compatibilityScore: 72,
    commonSkills: ["AWS", "Docker"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b820?w=150&h=150&fit=crop&crop=face",
    canTeach: ["Kubernetes", "Terraform", "Jenkins"],
    wantsToLearn: ["React", "Go", "Security"]
  }
];

export const mockHeatmapData = [
  // Generate heatmap data for the last 365 days
  ...Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5), // 0-4 activities per day
      activities: ["Learned React hooks", "Taught Python basics", "Completed challenge"]
    };
  }).reverse()
];

export const mockLeaderboard = [
  {
    userId: 3,
    name: "Michael Rodriguez",
    pseudonym: "DataNinja",
    points: 3120,
    level: 10,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skillsShared: 15,
    skillsLearned: 8
  },
  {
    userId: 4,
    name: "Emily Watson",
    pseudonym: "CloudQueen",
    points: 2780,
    level: 9,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b820?w=150&h=150&fit=crop&crop=face",
    skillsShared: 12,
    skillsLearned: 6
  },
  {
    userId: 1,
    name: "Alex Chen",
    pseudonym: "CodeWizard",
    points: 2450,
    level: 8,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skillsShared: 10,
    skillsLearned: 7
  },
  {
    userId: 2,
    name: "Sarah Johnson",
    pseudonym: "DesignMaven",
    points: 1890,
    level: 6,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    skillsShared: 8,
    skillsLearned: 5
  }
];

export const mockSkillMap = {
  currentSkills: ["React", "JavaScript", "HTML", "CSS"],
  desiredSkills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
  intermediateSkills: ["Python Basics", "Statistics", "Numpy", "Pandas"],
  suggestedPaths: [
    {
      id: 1,
      name: "Frontend to ML Path",
      steps: [
        { skill: "Python Basics", duration: "2 weeks", difficulty: "Easy" },
        { skill: "Statistics", duration: "3 weeks", difficulty: "Medium" },
        { skill: "Numpy", duration: "1 week", difficulty: "Easy" },
        { skill: "Pandas", duration: "2 weeks", difficulty: "Medium" },
        { skill: "Scikit-learn", duration: "4 weeks", difficulty: "Hard" },
        { skill: "TensorFlow", duration: "6 weeks", difficulty: "Hard" }
      ]
    },
    {
      id: 2,
      name: "Alternative Path",
      steps: [
        { skill: "Python Basics", duration: "2 weeks", difficulty: "Easy" },
        { skill: "Data Visualization", duration: "2 weeks", difficulty: "Medium" },
        { skill: "SQL", duration: "3 weeks", difficulty: "Medium" },
        { skill: "Machine Learning Basics", duration: "4 weeks", difficulty: "Hard" }
      ]
    }
  ]
};

export const mockChallenges = [
  {
    id: 1,
    title: "Build a Todo App with React Hooks",
    difficulty: "Easy",
    description: "Create a functional todo application using React hooks and local storage",
    points: 150,
    timeLimit: "2 hours",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    participants: 45,
    completed: false
  },
  {
    id: 2,
    title: "Implement Binary Search Algorithm",
    difficulty: "Medium",
    description: "Code an efficient binary search algorithm with proper error handling",
    points: 250,
    timeLimit: "1 hour",
    skills: ["Algorithms", "JavaScript", "Problem Solving"],
    participants: 32,
    completed: true
  },
  {
    id: 3,
    title: "Deploy ML Model with FastAPI",
    difficulty: "Hard",
    description: "Build and deploy a machine learning model using FastAPI and Docker",
    points: 500,
    timeLimit: "4 hours",
    skills: ["Python", "Machine Learning", "FastAPI", "Docker"],
    participants: 18,
    completed: false
  },
  {
    id: 4,
    title: "Design System Component Library",
    difficulty: "Medium",
    description: "Create a reusable component library with Storybook documentation",
    points: 300,
    timeLimit: "3 hours",
    skills: ["React", "TypeScript", "Storybook", "Design Systems"],
    participants: 28,
    completed: false
  },
  {
    id: 5,
    title: "CSS Animation Challenge",
    difficulty: "Easy",
    description: "Create smooth CSS animations without using JavaScript",
    points: 100,
    timeLimit: "1 hour",
    skills: ["CSS", "Animation", "HTML"],
    participants: 67,
    completed: true
  }
];

export const mockChatMessages = [
  {
    id: 1,
    sender: "SkillBot",
    message: "Welcome to SkillMitra! I'm here to help you connect with other learners.",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    isBot: true
  },
  {
    id: 2,
    sender: "Anonymous Learner",
    message: "Hi! I'm looking for someone to help me with React hooks.",
    timestamp: new Date(Date.now() - 240000).toISOString(),
    isBot: false
  },
  {
    id: 3,
    sender: "CodeMentor_47",
    message: "I can help! I've been working with React for 3 years. What specific part of hooks are you struggling with?",
    timestamp: new Date(Date.now() - 180000).toISOString(),
    isBot: false
  },
  {
    id: 4,
    sender: "Anonymous Learner",
    message: "Mainly useEffect and its cleanup functions. I'm getting memory leaks.",
    timestamp: new Date(Date.now() - 120000).toISOString(),
    isBot: false
  },
  {
    id: 5,
    sender: "CodeMentor_47",
    message: "That's a common issue! The key is to return a cleanup function. Would you like me to share a code example?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    isBot: false
  }
];

export const currentUser = mockUsers[0]; // Alex Chen as the logged-in user
