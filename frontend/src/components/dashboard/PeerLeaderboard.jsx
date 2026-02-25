import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from 'lucide-react';
import { mockLeaderboard } from '../../data/mockData';
import { cn, getInitials, formatPoints } from '../../utils/helpers';

const PeerLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all'); // all, month, week

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setLeaderboard(mockLeaderboard);
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, [timeframe]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">{rank}</span>
          </div>
        );
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
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
          <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
        </div>
        
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {leaderboard.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const heights = ['h-20', 'h-24', 'h-16']; // 2nd, 1st, 3rd
          const orders = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
          const actualIndex = orders.indexOf(index);
          
          return (
            <div key={user.userId} className={cn(
              "flex flex-col items-center",
              index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'
            )}>
              {/* Avatar */}
              <div className="relative mb-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={cn(
                      "rounded-full border-4",
                      rank === 1 ? "w-16 h-16 border-yellow-400" :
                      rank === 2 ? "w-14 h-14 border-gray-300" :
                      "w-12 h-12 border-amber-400"
                    )}
                  />
                ) : (
                  <div className={cn(
                    "bg-primary-500 rounded-full flex items-center justify-center border-4",
                    rank === 1 ? "w-16 h-16 border-yellow-400" :
                    rank === 2 ? "w-14 h-14 border-gray-300" :
                    "w-12 h-12 border-amber-400"
                  )}>
                    <span className="text-white font-medium">
                      {getInitials(user.name)}
                    </span>
                  </div>
                )}
                <div className={cn(
                  "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  getRankBadgeColor(rank)
                )}>
                  {rank}
                </div>
              </div>
              
              {/* Podium */}
              <div className={cn(
                "w-full rounded-t-lg flex flex-col items-center justify-end p-2 relative",
                heights[actualIndex],
                rank === 1 ? "bg-gradient-to-t from-yellow-400 to-yellow-300" :
                rank === 2 ? "bg-gradient-to-t from-gray-300 to-gray-200" :
                "bg-gradient-to-t from-amber-500 to-amber-400"
              )}>
                <div className="text-center">
                  <p className="text-xs font-medium text-white mb-1 truncate w-full">
                    {user.pseudonym}
                  </p>
                  <p className="text-lg font-bold text-white">
                    {formatPoints(user.points)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        {leaderboard.map((user, index) => {
          const rank = index + 1;
          
          return (
            <div
              key={user.userId}
              className={cn(
                "flex items-center space-x-4 p-3 rounded-xl transition-all duration-200",
                rank <= 3 ? "bg-gradient-to-r from-gray-50 to-white border border-gray-200" :
                "hover:bg-gray-50 border border-transparent hover:border-gray-200"
              )}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(rank)}
              </div>

              {/* Avatar */}
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {getInitials(user.name)}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-100 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-700">{user.level}</span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {user.pseudonym}
                  </h4>
                  {rank <= 3 && (
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{user.name}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{user.skillsShared} taught</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{user.skillsLearned} learned</span>
                  </span>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {formatPoints(user.points)}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium">View full leaderboard</span>
          <Trophy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PeerLeaderboard;
