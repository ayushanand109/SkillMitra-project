import React, { useState, useEffect } from 'react';
import { Calendar, Activity, TrendingUp } from 'lucide-react';
import { mockHeatmapData } from '../../data/mockData';
import { cn } from '../../utils/helpers';

const ProgressHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setHeatmapData(mockHeatmapData);
  }, []);

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-gray-100 hover:bg-gray-200';
    if (count === 1) return 'bg-primary-100 hover:bg-primary-200';
    if (count === 2) return 'bg-primary-300 hover:bg-primary-400';
    if (count === 3) return 'bg-primary-500 hover:bg-primary-600';
    return 'bg-primary-700 hover:bg-primary-800';
  };

  const getTooltipText = (data) => {
    if (data.count === 0) return 'No activity';
    if (data.count === 1) return '1 activity';
    return `${data.count} activities`;
  };

  const getWeekData = () => {
    const weeks = [];
    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);
    
    // Adjust start date to previous Sunday
    const firstDay = new Date(startDate);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());
    
    let currentDate = new Date(firstDay);
    
    while (currentDate <= endDate || weeks.length < 53) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateString = currentDate.toISOString().split('T')[0];
        const dayData = heatmapData.find(d => d.date === dateString) || {
          date: dateString,
          count: 0,
          activities: []
        };
        
        week.push({
          ...dayData,
          isCurrentYear: currentDate.getFullYear() === selectedYear,
          isToday: dateString === new Date().toISOString().split('T')[0]
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months;
  };

  const getTotalContributions = () => {
    return heatmapData.reduce((total, day) => total + day.count, 0);
  };

  const getCurrentStreak = () => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const sortedData = [...heatmapData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (const day of sortedData) {
      if (day.count > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const weeks = getWeekData();
  const monthLabels = getMonthLabels();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Learning Activity</h3>
        </div>
        
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
        >
          {[2023, 2024, 2025].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
          <div className="text-2xl font-bold text-primary-700">{getTotalContributions()}</div>
          <div className="text-sm text-primary-600">Total Activities</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
          <div className="text-2xl font-bold text-success-700">{getCurrentStreak()}</div>
          <div className="text-sm text-success-600">Day Streak</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg">
          <div className="text-2xl font-bold text-accent-700">
            {Math.round(getTotalContributions() / 365 * 10) / 10}
          </div>
          <div className="text-sm text-accent-600">Daily Average</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="relative">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-2 ml-8">
          {monthLabels.map((month, index) => (
            <span key={month} className="w-8 text-center">
              {index % 2 === 0 ? month : ''}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-between text-xs text-gray-500 mr-2 py-1">
            {dayLabels.map((day, index) => (
              <span key={day} className="h-3 flex items-center">
                {index % 2 === 1 ? day : ''}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn(
                      "w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 relative",
                      day.isCurrentYear ? getIntensityClass(day.count) : 'bg-gray-50',
                      day.isToday && 'ring-2 ring-primary-400 ring-offset-1'
                    )}
                    onMouseEnter={() => day.isCurrentYear && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute z-10 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2"
               style={{ 
                 left: '50%',
                 top: '0'
               }}>
            <div className="font-medium">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div>{getTooltipText(hoveredDay)}</div>
            {hoveredDay.activities.length > 0 && (
              <div className="mt-1 text-gray-300">
                {hoveredDay.activities[0]}
              </div>
            )}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>GitHub-style activity tracking</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={cn("w-2.5 h-2.5 rounded-sm", getIntensityClass(level))}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeatmap;
