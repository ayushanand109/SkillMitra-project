
import React, { useState, useEffect } from 'react';
import { Star, Users, MessageCircle, ArrowRight, Sparkles, Brain } from 'lucide-react';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { cn, getInitials } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";

const SkillMatchRecommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Check if user has added skills
  const hasSkills =
    (user?.skillsToTeach?.length || 0) > 0 ||
    (user?.skillsToLearn?.length || 0) > 0;

  useEffect(() => {
    if (!user || !hasSkills) {
      setIsLoading(false);
      return;
    }

    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("skillmitra_token");

        const response = await axios.get(
          "http://localhost:5000/api/users/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const users = response.data.filter(
          (u) => u._id !== user._id
        );

        const formattedMatches = users.map((u) => {

          const userTeach = u.skillsToTeach || [];
          const userLearn = u.skillsToLearn || [];

          const myTeach = user.skillsToTeach || [];
          const myLearn = user.skillsToLearn || [];

          const teachMatch = userTeach.filter(skill =>
            myLearn.includes(skill)
          );

          const learnMatch = userLearn.filter(skill =>
            myTeach.includes(skill)
          );

          let compatibilityScore = 0;

          if (teachMatch.length > 0 && learnMatch.length > 0) {
            compatibilityScore = 100;
          } else if (teachMatch.length > 0 || learnMatch.length > 0) {
            compatibilityScore = 60;
          } else {
            compatibilityScore = 0;
          }

          return {
            userId: u._id,
            name: u.name,
            avatar: null,
            compatibilityScore,
            canTeach: userTeach,
            wantsToLearn: userLearn
          };
        });

        // Remove 0% matches
        const filteredMatches = formattedMatches.filter(
          m => m.compatibilityScore > 0
        );

        setMatches(filteredMatches);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [user, hasSkills]);

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success-600 bg-success-100';
    if (score >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-orange-600 bg-orange-100';
  };

  const handleConnect = (match) => {
    setSelectedMatch(match);
    console.log("Connecting with:", match.name);
  };

  if (isLoading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">AI Skill Matches</h3>
        <p>Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="card">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            AI Skill Matches
          </h3>
          <Sparkles className="w-4 h-4 text-accent-500" />
        </div>

        {hasSkills && (
          <span className="text-sm text-gray-500">
            {matches.length} matches found
          </span>
        )}
      </div>

      {/* If user has no skills */}
      {!hasSkills && (
        <div className="text-center py-10">

          <p className="text-gray-500 mb-4">
            Add skills to discover the best learning partners.
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Find Matches
          </button>

        </div>
      )}

      {/* If user has skills but no matches */}
      {hasSkills && matches.length === 0 && (
        <p className="text-gray-500 text-center py-6">
          No skill matches found yet. Try adding more skills.
        </p>
      )}

      {/* Matches list */}
      {hasSkills && matches.length > 0 && (
        <div className="space-y-4">

          {matches.map((match) => (

            <div
              key={match.userId}
              className="p-4 rounded-xl border border-gray-100 hover:border-primary-200 transition-all"
            >

              <div className="flex items-start space-x-4">

                {/* Avatar */}
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {getInitials(match.name)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">

                  <div className="flex items-center justify-between mb-2">

                    <h4 className="font-medium text-gray-900">
                      {match.name}
                    </h4>

                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        getCompatibilityColor(match.compatibilityScore)
                      )}
                    >
                      <Star className="w-3 h-3 inline mr-1" />
                      {match.compatibilityScore}% AI Match
                    </div>

                  </div>

                  {/* Skills */}
                  <div className="space-y-2 mb-3">

                    <div>
                      <p className="text-xs font-medium text-success-700 mb-1">
                        Can teach:
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {match.canTeach.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-success-50 text-success-700 text-xs rounded-md border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-primary-700 mb-1">
                        Wants to learn:
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {match.wantsToLearn.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-2">

                    <button
                      onClick={() => handleConnect(match)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                    >
                      <Users className="w-3 h-3" />
                      Connect
                    </button>

                    <button
                      onClick={() => navigate(`/chat/${match.userId}`)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Chat
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">

            <h3 className="text-lg font-semibold mb-2">
              Connection Request Sent!
            </h3>

            <p className="text-gray-600 mb-4">
              Your request has been sent to {selectedMatch.name}.
            </p>

            <button
              onClick={() => setSelectedMatch(null)}
              className="btn-primary w-full"
            >
              Got it
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default SkillMatchRecommendations;

