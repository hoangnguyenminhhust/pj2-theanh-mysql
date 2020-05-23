const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  user_name: String,
  password: String,
});

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;

  return adminObject;
};

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({
    _id: admin._id.toString(),
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKENLIFETIME,
  });

  return token;
};

adminSchema.statics.findByCredentials = async (user_name, password) => {
  const admin = await Admin.findOne({
    user_name,
  });

  if (!admin) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return admin;
};

adminSchema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});
const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;