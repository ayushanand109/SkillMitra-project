
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Edit, Plus, X, Save, User, Briefcase, Trophy, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/helpers';

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    skillsToTeach: [],
    skillsToLearn: [],
    bio: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('known');

  // Sync form with logged-in user
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("skillmitra_token");

      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      updateProfile(response.data);

      // also update localStorage user
      localStorage.setItem(
        "skillmitra_user",
        JSON.stringify(response.data)
      );

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

    const skillArray =
      skillType === 'known'
        ? 'skillsToTeach'
        : 'skillsToLearn';

    if (!formData[skillArray].includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        [skillArray]: [...prev[skillArray], newSkill.trim()]
      }));
    }

    setNewSkill('');
  };

  const removeSkill = (skill, type) => {
    const skillArray =
      type === 'known'
        ? 'skillsToTeach'
        : 'skillsToLearn';

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

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Edit size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={16} /> Save
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="card text-center">

            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">
                {getInitials(user?.name || "User")}
              </span>
            </div>

            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500">{user?.jobTitle}</p>

            <p className="text-sm mt-2">
              Level {user?.level} • {user?.points} points
            </p>

            <div className="grid grid-cols-3 mt-6 text-center">

              <div>
                <div className="font-bold">
                  {user?.skillsToTeach?.length || 0}
                </div>
                <div className="text-xs">Skills</div>
              </div>

              <div>
                <div className="font-bold">
                  {user?.skillsToLearn?.length || 0}
                </div>
                <div className="text-xs">Learning</div>
              </div>

              <div>
                <div className="font-bold">
                  {user?.badges?.length || 0}
                </div>
                <div className="text-xs">Badges</div>
              </div>

            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Bio */}
            <div className="card">
              <h3 className="font-semibold mb-3">Bio</h3>

              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))
                  }
                  className="input-field"
                />
              ) : (
                <p>{user?.bio || "No bio yet"}</p>
              )}

            </div>

            {/* Skills to Teach */}
            <div className="card">
              <h3 className="font-semibold mb-3">Skills I Know</h3>

              {isEditing && (
                <div className="flex gap-2 mb-3">

                  <input
                    value={skillType === 'known' ? newSkill : ''}
                    onChange={(e) => {
                      setNewSkill(e.target.value);
                      setSkillType('known');
                    }}
                    onKeyPress={handleKeyPress}
                    className="input-field flex-1"
                  />

                  <button onClick={addSkill} className="btn-primary">
                    <Plus size={16} />
                  </button>

                </div>
              )}

              <div className="flex flex-wrap gap-2">

                {(isEditing
                  ? formData.skillsToTeach
                  : user?.skillsToTeach || []).map(skill => (

                  <div
                    key={skill}
                    className="px-3 py-1 bg-green-100 rounded-full flex items-center gap-1"
                  >
                    {skill}

                    {isEditing && (
                      <button onClick={() => removeSkill(skill, 'known')}>
                        <X size={12} />
                      </button>
                    )}

                  </div>

                ))}

              </div>
            </div>

            {/* Skills to Learn */}
            <div className="card">
              <h3 className="font-semibold mb-3">
                Skills I Want to Learn
              </h3>

              <div className="flex flex-wrap gap-2">

                {(isEditing
                  ? formData.skillsToLearn
                  : user?.skillsToLearn || []).map(skill => (

                  <div
                    key={skill}
                    className="px-3 py-1 bg-blue-100 rounded-full"
                  >
                    {skill}
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

export default Profile;

