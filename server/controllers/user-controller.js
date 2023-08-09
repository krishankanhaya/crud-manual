const User = require("../models/user");

const register = async (req, res, next) => {
  let existingUser;
  const { name, email } = req.body;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = new User({
    name,
    email,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: user });
};

module.exports = { register };
