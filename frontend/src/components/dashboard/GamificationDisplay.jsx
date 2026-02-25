import React, { useState } from 'react';
import { Trophy, Star, Zap, Award, TrendingUp, Gift, Crown, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn, formatPoints, getLevelProgress, calculateLevel } from '../../utils/helpers';

const GamificationDisplay = () => {
  const { user } = useAuth();

const safeUser = {
  points: user?.points || 0,
  level: user?.level || 1,
  badges: user?.badges || []
};
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!safeUser) return null;

  const levelProgress = getLevelProgress(safeUser.points);
  const nextLevelPoints = (safeUser.level * 500) - (safeUser.points % 500);

  const badges = [
    {
      id: 'teacher',
      name: 'Master Teacher',
      description: 'Taught 10+ skills to other learners',
      icon: Award,
      color: 'text-blue-600 bg-blue-100',
      earned: safeUser.badges.includes('Teacher'),
      rarity: 'common'
    },
    {
      id: 'learner',
      name: 'Eager Learner',
      description: 'Completed 5+ learning sessions',
      icon: Target,
      color: 'text-green-600 bg-green-100',
      earned: safeUser.badges.includes('Learner'),
      rarity: 'common'
    },
    {
      id: 'collaborator',
      name: 'Team Player',
      description: 'Participated in 3+ collaborative projects',
      icon: Star,
      color: 'text-purple-600 bg-purple-100',
      earned: safeUser.badges.includes('Collaborator'),
      rarity: 'uncommon'
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: 'Solved 20+ challenges',
      icon: Zap,
      color: 'text-yellow-600 bg-yellow-100',
      earned: safeUser.badges.includes('Problem Solver'),
      rarity: 'rare'
    },
    {
      id: 'mentor',
      name: 'Community Mentor',
      description: 'Helped 50+ community members',
      icon: Crown,
      color: 'text-orange-600 bg-orange-100',
      earned: safeUser.badges.includes('Mentor'),
      rarity: 'epic'
    },
    {
      id: 'streak',
      name: 'Streak Master',
      description: 'Maintained 30-day learning streak',
      icon: TrendingUp,
      color: 'text-red-600 bg-red-100',
      earned: false,
      rarity: 'legendary'
    }
  ];

  const achievements = [
    { name: 'First Connection', points: 50, completed: true },
    { name: 'Complete Profile', points: 100, completed: true },
    { name: 'First Skill Shared', points: 150, completed: true },
    { name: 'Join 5 Conversations', points: 200, completed: false },
    { name: 'Complete 10 Challenges', points: 500, completed: false },
    { name: 'Reach Level 10', points: 1000, completed: false }
  ];

  const recentActivities = [
    { action: 'Completed React Challenge', points: 150, time: '2 hours ago' },
    { action: 'Helped with Python question', points: 75, time: '5 hours ago' },
    { action: 'Connected with new mentor', points: 50, time: '1 day ago' },
    { action: 'Shared JavaScript knowledge', points: 100, time: '2 days ago' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-green-300 bg-green-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'badges', label: 'Badges' },
          { id: 'achievements', label: 'Achievements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={cn(
              "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
              selectedTab === tab.id
                ? "bg-white text-primary-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Level {safeUser.level}
                </h4>
                <p className="text-sm text-gray-600">
                  {nextLevelPoints} points to next level
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-700">
                  {formatPoints(safeUser.points)}
                </div>
                <div className="text-sm text-gray-600">total points</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 text-right">
              {Math.round(levelProgress)}% complete
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
              <div className="text-2xl font-bold text-success-700 mb-1">
                {safeUser.badges.length}
              </div>
              <div className="text-sm text-success-600">Badges Earned</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg">
              <div className="text-2xl font-bold text-warning-700 mb-1">
                {achievements.filter(a => a.completed).length}
              </div>
              <div className="text-sm text-warning-600">Achievements</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-success-600">
                    <span className="text-sm font-medium">+{activity.points}</span>
                    <Zap className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200",
                  badge.earned 
                    ? getRarityColor(badge.rarity) + " shadow-sm"
                    : "border-gray-200 bg-gray-50 opacity-60"
                )}
              >
                <div className="text-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2",
                    badge.earned ? badge.color : "bg-gray-200 text-gray-400"
                  )}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <h5 className={cn(
                    "font-medium text-sm mb-1",
                    badge.earned ? "text-gray-900" : "text-gray-500"
                  )}>
                    {badge.name}
                  </h5>
                  <p className="text-xs text-gray-600 leading-tight">
                    {badge.description}
                  </p>
                  <div className={cn(
                    "inline-block px-2 py-1 rounded-full text-xs font-medium mt-2",
                    `bg-${badge.rarity === 'common' ? 'gray' : 
                        badge.rarity === 'uncommon' ? 'green' :
                        badge.rarity === 'rare' ? 'blue' :
                        badge.rarity === 'epic' ? 'purple' : 'yellow'}-100`,
                    `text-${badge.rarity === 'common' ? 'gray' : 
                        badge.rarity === 'uncommon' ? 'green' :
                        badge.rarity === 'rare' ? 'blue' :
                        badge.rarity === 'epic' ? 'purple' : 'yellow'}-700`
                  )}>
                    {badge.rarity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {selectedTab === 'achievements' && (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                achievement.completed
                  ? "bg-success-50 border-success-200"
                  : "bg-gray-50 border-gray-200"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  achievement.completed
                    ? "bg-success-500 text-white"
                    : "bg-gray-300 text-gray-500"
                )}>
                  {achievement.completed ? (
                    <Trophy className="w-4 h-4" />
                  ) : (
                    <Target className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h5 className={cn(
                    "font-medium",
                    achievement.completed ? "text-success-700" : "text-gray-900"
                  )}>
                    {achievement.name}
                  </h5>
                  {achievement.completed && (
                    <p className="text-sm text-success-600">Completed!</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <span className="font-medium">{achievement.points}</span>
                <Gift className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamificationDisplay;
