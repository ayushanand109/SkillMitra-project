import React from 'react';
import MicroChallenges from '../components/dashboard/MicroChallenges';

const Challenges = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Skill Challenges
          </h1>
          <p className="text-gray-600 mt-2">
            Test your abilities with AI-powered micro-challenges and earn points!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main challenges */}
          <div className="lg:col-span-3">
            <MicroChallenges />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Challenge Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Read requirements carefully</li>
                <li>• Start with easier challenges</li>
                <li>• Use time limits as motivation</li>
                <li>• Learn from failed attempts</li>
                <li>• Ask for help when stuck</li>
              </ul>
            </div>

            {/* Categories */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {[
                  { name: 'Frontend', count: 12 },
                  { name: 'Backend', count: 8 },
                  { name: 'Data Science', count: 6 },
                  { name: 'DevOps', count: 4 },
                  { name: 'Mobile', count: 5 }
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-gray-500">{category.count}</span>
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

export default Challenges;
