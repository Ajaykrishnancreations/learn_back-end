const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const courses = require("../models/course")

const auth = require("../helpers/auth");


module.exports.register = async (req, res) => {
  try {
    const { name, email, phone, password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      phone,
      password: hashedPassword,
      role
    };
    await userModel(user).save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const accessToken = auth.generateAccessToken({ userId: user._id, userName:user.name, userEmail:user.email });
    const refreshToken = auth.generateRefreshToken({ userId: user._id,userName:user.name, userEmail:user.email  });
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.course = async (req, res) => {
  try {
    const { title, img, description,role} = req.body;
    const course = {
      title,
      img,
      description,
      role
    };
    await courses(course).save();
    res.status(201).json({ message: "course added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCourse = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne(email);
    if(!user) 
    {
      return res.status(401).json({ message: "Given Mail-id is not found" });
    }
    const allCourse = await courses.find();
    if (!allCourse) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.status(200).json(allCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getAllStudentInfo = async (req, res) => {
try {
  const allCourse = await userModel.find();
  if (!allCourse) {
    return res.status(404).json({ message: 'No courses found' });
  }
  res.status(200).json(allCourse);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
};

module.exports.updateUser = async (req, res) => {
  try {
    let userId = req.body._id
    let data = req.body
    if (!userId) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
    
    const updatedUser = await userModel.updateOne(
      {_id:userId},
      {
        $set:{
          ...data
        }
      }
    );

    console.log(updatedUser,"updatedUserupdatedUserupdatedUser");
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};