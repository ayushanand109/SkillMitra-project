import React from 'react';
import AnonymousChat from '../components/dashboard/AnonymousChat';

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Community Chat
          </h1>
          <p className="text-gray-600 mt-2">
            Connect with mentors and learners in our anonymous chat rooms
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main chat */}
          <div className="lg:col-span-3">
            <div className="h-[600px]">
              <AnonymousChat />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Guidelines */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Chat Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful and kind</li>
                <li>• No spam or self-promotion</li>
                <li>• Help others when you can</li>
                <li>• Keep discussions skill-related</li>
                <li>• Report inappropriate behavior</li>
              </ul>
            </div>

            {/* Popular Topics */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Popular Topics</h3>
              <div className="space-y-2">
                {[
                  { topic: '#react-help', count: 24 },
                  { topic: '#python-beginners', count: 18 },
                  { topic: '#career-advice', count: 15 },
                  { topic: '#project-showcase', count: 12 },
                  { topic: '#study-groups', count: 9 }
                ].map((item) => (
                  <div key={item.topic} className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 font-medium">{item.topic}</span>
                    <span className="text-gray-500">{item.count} active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-primary text-sm py-2">
                  Find Study Partner
                </button>
                <button className="w-full btn-secondary text-sm py-2">
                  Ask for Help
                </button>
                <button className="w-full btn-accent text-sm py-2">
                  Share Knowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
