import React, { useState, useEffect } from 'react';
import { MapPin, Target, ArrowRight, Clock, BarChart3, Play, CheckCircle } from 'lucide-react';
import { mockSkillMap } from '../../data/mockData';
import { cn, getDifficultyClass } from '../../utils/helpers';

const SkillMapNavigator = () => {
  const [skillMap, setSkillMap] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchSkillMap = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.get("http://localhost:5000/api/skillmap");
      setSkillMap(response.data);
      setSelectedPath(mockSkillMap.suggestedPaths[0]);
      setIsLoading(false);
    };

    fetchSkillMap();
  }, []);

  const handleStartPath = (path) => {
    setSelectedPath(path);
    setActiveStep(0);
    // In a real app, this would save the selected path and start tracking progress
    console.log('Starting learning path:', path.name);
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-accent-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">SkillMap Navigator</h3>
        </div>
        
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-accent-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">SkillMap Navigator</h3>
        </div>
        <div className="text-sm text-gray-500">AI-powered paths</div>
      </div>

      {/* Current → Desired Skills Overview */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Skills</h4>
            <div className="flex flex-wrap gap-1">
              {skillMap.currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-md border border-success-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <ArrowRight className="w-5 h-5 text-gray-400 mx-4 flex-shrink-0" />
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Target Skills</h4>
            <div className="flex flex-wrap gap-1">
              {skillMap.desiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-md border border-accent-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900 flex items-center space-x-2">
          <Target className="w-4 h-4 text-accent-500" />
          <span>Suggested Learning Paths</span>
        </h4>
        
        <div className="grid gap-4">
          {skillMap.suggestedPaths.map((path) => (
            <div
              key={path.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                selectedPath?.id === path.id
                  ? "border-accent-300 bg-accent-50 shadow-medium"
                  : "border-gray-200 hover:border-accent-200 hover:bg-accent-25"
              )}
              onClick={() => setSelectedPath(path)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium text-gray-900">{path.name}</h5>
                  <p className="text-sm text-gray-600">
                    {path.steps.length} steps • {path.steps.reduce((total, step) => 
                      total + parseInt(step.duration.split(' ')[0]), 0
                    )} weeks total
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPath(path);
                  }}
                  className="btn-accent text-sm px-3 py-1"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </button>
              </div>
              
              {/* Path Preview */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {path.steps.slice(0, 4).map((step, index) => (
                  <React.Fragment key={step.skill}>
                    <div className="flex-shrink-0 text-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1",
                        index === 0 ? "bg-accent-100 text-accent-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {index + 1}
                      </div>
                      <div className="text-xs text-gray-600 max-w-16 truncate">
                        {step.skill}
                      </div>
                    </div>
                    {index < Math.min(path.steps.length - 1, 3) && (
                      <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
                {path.steps.length > 4 && (
                  <div className="text-xs text-gray-500 flex-shrink-0">
                    +{path.steps.length - 4} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Path Details */}
      {selectedPath && (
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">{selectedPath.name} - Detailed Steps</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span>Progress: {activeStep}/{selectedPath.steps.length}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {selectedPath.steps.map((step, index) => {
              const isCompleted = index < activeStep;
              const isCurrent = index === activeStep;
              const isUpcoming = index > activeStep;
              
              return (
                <div
                  key={step.skill}
                  className={cn(
                    "flex items-center space-x-4 p-3 rounded-lg transition-all duration-200",
                    isCompleted && "bg-success-50 border border-success-200",
                    isCurrent && "bg-accent-50 border border-accent-200 ring-2 ring-accent-100",
                    isUpcoming && "bg-gray-50 border border-gray-200"
                  )}
                >
                  {/* Step Number/Status */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    isCompleted && "bg-success-500 text-white",
                    isCurrent && "bg-accent-500 text-white",
                    isUpcoming && "bg-gray-300 text-gray-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className={cn(
                        "font-medium",
                        isCompleted && "text-success-700",
                        isCurrent && "text-accent-700",
                        isUpcoming && "text-gray-700"
                      )}>
                        {step.skill}
                      </h5>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                        getDifficultyClass(step.difficulty)
                      )}>
                        {step.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Action */}
                  {isCurrent && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="btn-accent text-sm px-3 py-1"
                    >
                      Start Learning
                    </button>
                  )}
                  
                  {isCompleted && (
                    <div className="text-success-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round((activeStep / selectedPath.steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(activeStep / selectedPath.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillMapNavigator;
