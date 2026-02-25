import { User } from "../models/User.js";

// 🔹 MATCHING FUNCTION
export const getMatches = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = await User.find({
      _id: { $ne: currentUserId },
      skillsToTeach: { $in: currentUser.skillsToLearn },
      skillsToLearn: { $in: currentUser.skillsToTeach }
    }).select("-password");

    res.status(200).json(matches);

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