const mongoose = require('mongoose');


const PermissionLevel = {
  CLIENT: 0,
  MANAGER: 1,
  ADMIN: 2,
  OWNER: 3,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  permissionLevel: {
    type: Number,
    default: PermissionLevel.CLIENT,
    enum: Object.values(PermissionLevel),
  },
});

module.exports = {mongoose.model('User', userSchema), PermissionLevel};