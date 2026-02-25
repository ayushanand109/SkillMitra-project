import React from 'react';
import PeerLeaderboard from '../components/dashboard/PeerLeaderboard';

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Community Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">
            See how you rank among fellow skill swappers in the community
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main leaderboard */}
          <div className="lg:col-span-3">
            <PeerLeaderboard />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How Points Work */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">How Points Work</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Teaching a skill</span>
                  <span className="font-medium text-success-600">+100 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Learning a skill</span>
                  <span className="font-medium text-primary-600">+50 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completing challenge</span>
                  <span className="font-medium text-warning-600">+150 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Helping others</span>
                  <span className="font-medium text-accent-600">+75 pts</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Top Achievements</h3>
              <div className="space-y-3">
                {[
                  { name: 'First Place', desc: 'Reach #1 on leaderboard', icon: '🥇' },
                  { name: 'Top Teacher', desc: 'Teach 20+ skills', icon: '🎓' },
                  { name: 'Challenge Master', desc: 'Complete 50+ challenges', icon: '🏆' },
                  { name: 'Community Helper', desc: 'Help 100+ members', icon: '🤝' }
                ].map((achievement) => (
                  <div key={achievement.name} className="flex items-start space-x-3">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
