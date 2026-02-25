import React from 'react';
import { useAuth } from '../context/AuthContext';
import SkillMatchRecommendations from '../components/dashboard/SkillMatchRecommendations';
import ProgressHeatmap from '../components/dashboard/ProgressHeatmap';
import PeerLeaderboard from '../components/dashboard/PeerLeaderboard';
import SkillMapNavigator from '../components/dashboard/SkillMapNavigator';
import AnonymousChat from '../components/dashboard/AnonymousChat';
import MicroChallenges from '../components/dashboard/MicroChallenges';
import GamificationDisplay from '../components/dashboard/GamificationDisplay';

const Dashboard = () => {
  const { user, anonymousMode } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = anonymousMode ? user?.pseudonym : user?.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">
                {getGreeting()}, {displayName}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                {anonymousMode ? (
                  <>
                    You're browsing anonymously • 
                    <span className="text-accent-600 font-medium"> Private mode active</span>
                  </>
                ) : (
                  'Ready to learn and share some skills today?'
                )}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{user?.level}</div>
                <div className="text-sm text-gray-500">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">{user?.points}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">{user?.badges?.length || 0}</div>
                <div className="text-sm text-gray-500">Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Skill Matches */}
            <SkillMatchRecommendations />
            
            {/* Progress Heatmap */}
            <ProgressHeatmap />
            
            {/* Skill Map Navigator */}
            <SkillMapNavigator />
            
            {/* Micro Challenges */}
            <MicroChallenges />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Gamification Display */}
            <GamificationDisplay />
            
            {/* Peer Leaderboard */}
            <PeerLeaderboard />
            
            {/* Anonymous Chat */}
            <AnonymousChat />
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden mt-8">
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary p-4 text-center">
              <div className="text-lg font-semibold">Find Mentor</div>
              <div className="text-sm opacity-90">Connect with experts</div>
            </button>
            <button className="btn-accent p-4 text-center">
              <div className="text-lg font-semibold">Start Challenge</div>
              <div className="text-sm opacity-90">Test your skills</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
