import React, { useState, useEffect } from 'react';
import { Star, Users, MessageCircle, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { mockMatches } from '../../data/mockData';
import { cn, getInitials } from '../../utils/helpers';

const SkillMatchRecommendations = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    // Simulate API call to get AI-powered skill matches
    const fetchMatches = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMatches(mockMatches);
      setIsLoading(false);
    };

    fetchMatches();
  }, []);

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success-600 bg-success-100';
    if (score >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-orange-600 bg-orange-100';
  };

  const handleConnect = (match) => {
    setSelectedMatch(match);
    // In a real app, this would send a connection request
    console.log('Connecting with:', match.name);
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Skill Matches</h3>
          <Sparkles className="w-4 h-4 text-accent-500" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Skill Matches</h3>
          <Sparkles className="w-4 h-4 text-accent-500" />
        </div>
        <span className="text-sm text-gray-500">{matches.length} matches found</span>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.userId}
            className="group p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-medium transition-all duration-200 bg-gradient-to-r from-white to-gray-50/50"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="relative">
                {match.avatar ? (
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {getInitials(match.name)}
                    </span>
                  </div>
                )}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-100 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                      {match.pseudonym}
                    </h4>
                    <p className="text-sm text-gray-600">{match.name}</p>
                  </div>
                  
                  {/* Compatibility Score */}
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    getCompatibilityColor(match.compatibilityScore)
                  )}>
                    <Star className="w-3 h-3 inline mr-1" />
                    {match.compatibilityScore}% match
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs font-medium text-success-700 mb-1">Can teach:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.canTeach.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-success-50 text-success-700 text-xs rounded-md border border-success-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {match.canTeach.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                          +{match.canTeach.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-primary-700 mb-1">Wants to learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.wantsToLearn.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md border border-primary-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {match.wantsToLearn.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                          +{match.wantsToLearn.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleConnect(match)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Users className="w-3 h-3" />
                    <span>Connect</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200">
                    <MessageCircle className="w-3 h-3" />
                    <span>Message</span>
                  </button>
                  
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium">View all matches</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Connection Success Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connection Request Sent!
              </h3>
              <p className="text-gray-600 mb-4">
                Your connection request has been sent to {selectedMatch.pseudonym}. 
                They'll be notified and can accept or decline your request.
              </p>
              <button
                onClick={() => setSelectedMatch(null)}
                className="btn-primary w-full"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillMatchRecommendations;
