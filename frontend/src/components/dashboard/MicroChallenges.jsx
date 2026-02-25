import React, { useState, useEffect } from 'react';
import { Target, Clock, Users, Star, Trophy, Play, CheckCircle, Filter } from 'lucide-react';
import { mockChallenges } from '../../data/mockData';
import { cn, getDifficultyClass } from '../../utils/helpers';

const MicroChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, easy, medium, hard
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setChallenges(mockChallenges);
      setIsLoading(false);
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => 
    filter === 'all' || challenge.difficulty.toLowerCase() === filter
  );

  const handleStartChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    // In a real app, this would navigate to the challenge or open a modal
    console.log('Starting challenge:', challenge.title);
  };

  const getDifficultyStats = () => {
    const stats = {
      easy: challenges.filter(c => c.difficulty === 'Easy').length,
      medium: challenges.filter(c => c.difficulty === 'Medium').length,
      hard: challenges.filter(c => c.difficulty === 'Hard').length,
      completed: challenges.filter(c => c.completed).length
    };
    return stats;
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Micro-Challenges</h3>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = getDifficultyStats();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Micro-Challenges</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
          <div className="text-lg font-bold text-success-700">{stats.easy}</div>
          <div className="text-xs text-success-600">Easy</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg">
          <div className="text-lg font-bold text-warning-700">{stats.medium}</div>
          <div className="text-xs text-warning-600">Medium</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-danger-50 to-danger-100 rounded-lg">
          <div className="text-lg font-bold text-danger-700">{stats.hard}</div>
          <div className="text-xs text-danger-600">Hard</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
          <div className="text-lg font-bold text-primary-700">{stats.completed}</div>
          <div className="text-xs text-primary-600">Completed</div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className={cn(
              "p-4 rounded-xl border transition-all duration-200 hover:shadow-medium",
              challenge.completed 
                ? "bg-success-50 border-success-200" 
                : "bg-white border-gray-200 hover:border-primary-200"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className={cn(
                    "font-medium",
                    challenge.completed ? "text-success-700" : "text-gray-900"
                  )}>
                    {challenge.title}
                  </h4>
                  {challenge.completed && (
                    <CheckCircle className="w-4 h-4 text-success-600" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {challenge.description}
                </p>
                
                {/* Challenge Meta */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{challenge.timeLimit}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{challenge.participants} participants</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{challenge.points} points</span>
                  </span>
                </div>
              </div>
              
              {/* Difficulty Badge */}
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border ml-4",
                getDifficultyClass(challenge.difficulty)
              )}>
                {challenge.difficulty}
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {challenge.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md border border-primary-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {challenge.completed && (
                  <div className="flex items-center space-x-1 text-success-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Completed!</span>
                  </div>
                )}
              </div>
              
              {!challenge.completed ? (
                <button
                  onClick={() => handleStartChallenge(challenge)}
                  className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <Play className="w-3 h-3" />
                  <span>Start Challenge</span>
                </button>
              ) : (
                <button className="btn-secondary text-sm px-4 py-2">
                  View Solution
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedChallenge.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium border",
                    getDifficultyClass(selectedChallenge.difficulty)
                  )}>
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{selectedChallenge.timeLimit}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{selectedChallenge.points} points</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedChallenge.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChallenge.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-lg border border-primary-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Challenge Guidelines</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Read the requirements carefully</li>
                  <li>• Test your solution thoroughly</li>
                  <li>• Submit within the time limit</li>
                  <li>• Ask for help if you're stuck</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Start the challenge
                  setSelectedChallenge(null);
                  console.log('Starting challenge:', selectedChallenge.title);
                }}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Start Challenge</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load More */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium">Load more challenges</span>
          <Target className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MicroChallenges;
