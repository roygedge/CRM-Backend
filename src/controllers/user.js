const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { PermissionLevel } = require('../models/user');


async function register(req, res) {
  const { name, email, password } = req.body;
  const userPremissionLevel = permissionLevel.Client;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    userPremissionLevel
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) 
    return res.status(400).send('Email or password is invalid');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) 
    return res.status(400).send('Email or password is invalid');
  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.header('Authorization', token).send(token);
};

async function createManager(req, res){
  if (req.user.permissionLevel > PermissionLevel.MANAGER){
    // Code to create a new admin user
    const newManager = new User({
      username: req.body.username,
      password: req.body.password,
      permissionLevel: PermissionLevel.MANAGER
    });

    try {
      const savedManager = await newManager.save();
      res.send(savedManager);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

async function grantPremissions(req, res){
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (req.user.permissionLevel > user.permissionLevel) {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { permissionLevel: req.body.permissionLevel }, { new: true });
      res.send(updatedUser);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


  module.exports = {
    register,
    login,
    grantPremissions
  };