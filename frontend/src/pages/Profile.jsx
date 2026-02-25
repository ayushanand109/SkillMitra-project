import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Edit, Plus, X, Save, User, Briefcase, Trophy, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn, getInitials } from '../utils/helpers';


const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  name: user?.name || '',
  jobTitle: user?.jobTitle || '',
  skillsToTeach: user?.skillsToTeach || [],
  skillsToLearn: user?.skillsToLearn || [],
  bio: user?.bio || ''
});
useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || '',
      jobTitle: user.jobTitle || '',
      skillsToTeach: user.skillsToTeach || [],
      skillsToLearn: user.skillsToLearn || [],
      bio: user.bio || ''
    });
  }
}, [user]);
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('known'); // 'known' or 'toLearn'

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("skillmitra_token");

    const response = await axios.put(
      "http://localhost:5000/api/users/profile",
      {
        bio: formData.bio,
        skillsToTeach: formData.skillsToTeach,
        skillsToLearn: formData.skillsToLearn,
        jobTitle: formData.jobTitle
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Update global user state
    updateProfile(response.data);

    setIsEditing(false);
    alert("Profile updated successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to update profile");
  }
};

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      jobTitle: user?.jobTitle || '',
      skillsToTeach: user?.skillsToTeach || [],
      skillsToLearn: user?.skillsToLearn || [],
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skillArray = skillType === 'known' ? 'skillsToTeach' : 'skillsToLearn';
    if (!formData[skillArray].includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        [skillArray]: [...prev[skillArray], newSkill.trim()]
      }));
    }
    setNewSkill('');
  };

  const removeSkill = (skill, type) => {
    const skillArray = type === 'known' ? 'skillsToTeach' : 'skillsToLearn';
    setFormData(prev => ({
      ...prev,
      [skillArray]: prev[skillArray].filter(s => s !== skill)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              Profile Settings
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-medium mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center border-4 border-white shadow-medium mx-auto">
                    <span className="text-white text-2xl font-bold">
                      {getInitials(user?.name || "User")}
                    </span>
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-gray-600">{user?.jobTitle}</p>
                <p className="text-sm text-gray-500">
                  Level {user?.level} • {user?.points} points
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {user?.skillsToTeach?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Skills Known</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-600">
                    {user?.skillsToLearn?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Want to Learn</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success-600">
                    {user?.badges?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Badges</div>
                </div>
              </div>

              {/* Badges */}
              {user?.badges && user.badges.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Badges</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.badges.slice(0, 4).map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs"
                      >
                        <Trophy className="w-3 h-3" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-primary-500" />
                <span>Basic Information</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.name || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., Frontend Developer"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.jobTitle || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Tell others about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">{user?.bio || 'No bio yet'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Known */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-success-500" />
                <span>Skills I Know</span>
              </h3>

              {isEditing && (
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={skillType === 'known' ? newSkill : ''}
                      onChange={(e) => {
                        setNewSkill(e.target.value);
                        setSkillType('known');
                      }}
                      onKeyPress={handleKeyPress}
                      className="input-field flex-1"
                      placeholder="Add a skill you know..."
                    />
                    <button
                      onClick={() => {
                        setSkillType('known');
                        addSkill();
                      }}
                      className="btn-primary px-4"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.skillsToTeach : user?.skillsToTeach || []).map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm border border-success-200"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill, 'known')}
                        className="text-success-600 hover:text-success-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {(!user?.skillsToTeach || user.skillsToTeach.length === 0) && !isEditing && (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Skills to Learn */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-accent-500" />
                <span>Skills I Want to Learn</span>
              </h3>

              {isEditing && (
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={skillType === 'toLearn' ? newSkill : ''}
                      onChange={(e) => {
                        setNewSkill(e.target.value);
                        setSkillType('toLearn');
                      }}
                      onKeyPress={handleKeyPress}
                      className="input-field flex-1"
                      placeholder="Add a skill you want to learn..."
                    />
                    <button
                      onClick={() => {
                        setSkillType('toLearn');
                        addSkill();
                      }}
                      className="btn-accent px-4"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.skillsToLearn : user?.skillsToLearn || []).map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm border border-accent-200"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill, 'toLearn')}
                        className="text-accent-600 hover:text-accent-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {(!user?.skillsToLearn || user.skillsToLearn.length === 0) && !isEditing && (
                  <p className="text-gray-500 text-sm">No learning goals set yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
