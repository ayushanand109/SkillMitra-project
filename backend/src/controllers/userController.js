import { User } from "../models/User.js";

// 🔹 MATCHING FUNCTION
export const getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id }
    });

    const matches = users.map((user) => {

      const teachMatch = user.skillsToTeach.filter(skill =>
        currentUser.skillsToLearn.includes(skill)
      );

      const learnMatch = user.skillsToLearn.filter(skill =>
        currentUser.skillsToTeach.includes(skill)
      );

      const score =
        (teachMatch.length + learnMatch.length) * 25;

      return {
        userId: user._id,
        name: user.name,
        skillsToTeach: user.skillsToTeach,
        skillsToLearn: user.skillsToLearn,
        compatibilityScore: Math.min(score, 100)
      };
    });

    matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json(matches);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔹 UPDATE PROFILE FUNCTION
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { bio, skillsToTeach, skillsToLearn ,jobTitle} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio, skillsToTeach, skillsToLearn,jobTitle },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};