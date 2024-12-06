const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserList = async (req, res) => {
  const query = req.query;
  
  
  query.deleted = false;
  let allListData = await User.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();
  const result = allListData.filter((item) => item.createdBy !== null);
  let totalRecords = result.length;
  res.send({ result, total_recodes: totalRecords });
  // const query = req.query;
  // query.deleted = false;
  // //let result = await User.find({ deleted: false, role: { $ne: 'admin' }, userId: req.createdBy });
  // let result = await User.find({ deleted: false, role: { $ne: 'admin' }, createdBy: req.createdBy });
  // let totalRecords = await User.countDocuments();
  // console.log("log query === ", query)
  // res.send({ result, total_recodes: totalRecords });
};

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await User.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const view = async (req, res) => {
  let user = await User.findById({ _id: req.params.id });
  if (!user) return res.status(404).json({ message: "no Data Found." });
  res.status(200).json(user);
};

const edit = async (req, res) => {
  try {
    let result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          modifiedOn: req.body.modifiedOn,
        },
      }
    );
    res.status(200).json({ result, message: "User updated successfully" });
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

const deleteData = async (req, res) => {
  try {
    const userId = req.params.id;
    // Assuming you have retrieved the user document using userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      await User.findByIdAndUpdate({ _id: userId }, { deleted: true });
      res.send({ message: "User deleted successfully " });
    } else {
      res.send({ message: "Admin can not deleted" });
    }
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const register = async (req, res) => {
  try {    
    const { fname, lname, email, password, role, createdBy } = req.body;
    // Check if the username is already taken
    const existingUser = await User.findOne({ emailAddress: email });
    if (existingUser) {
      res.status(401).json({ message: "Email address already exists" });
      return;
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName: fname,
      lastName: lname,
      emailAddress: email,
      password: hashedPassword,
      role: role,
      createdBy: createdBy
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ emailAddress: email });
    if (!user) {
      res.status(401).json({ message: "invalid Email" });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "invalid Password" });
      return;
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1d",
    });
    res.setHeader("Authorization", token);
    res.status(200).json({ token: token, user, message: "Login successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { getUserList, view, edit, deleteData, register, login };

