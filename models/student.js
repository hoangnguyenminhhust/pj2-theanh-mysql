const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  user_name: {
    unique: true,
    type: String,
  },
  password: {
    type: String,
  },
  full_name: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  branch: String,
  course: Number,
  cmnd_card: {
    type: Number,
    maxlength: 12,
  },
  cmnd_card_date: {
    type: String,
  },
  dien_chinh_sach_uu_tien_theo_quy_dinh: String,
  dien_khac: String,
  doan_the: {
    type: String,
    enum: ['đảng viên', 'đoàn viên', 'Bộ đội hoặc TNXP xuất ngũ'],
  },
  hoat_dong_xa_hoi: String,
  so_truong_nang_khieu: String,
  phone_number: {
    type: Number,
  },
  email: {
    type: String,
  },
  birth: {
    type: String,
  },
  student_status: {
    type: String,
    enum: ['Verified', 'Not Verify', 'In Room', 'Out Room'],
    default: 'Not Verify',
  },
  khi_can_baocho_ong_ba: String,
  dien_thoai_ong_ba: Number,
  email_ong_ba: String,
  date_valid: {
    type: String
  },
  date_valid_room: {
    type: String,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null,
  },
});

studentSchema.methods.toJSON = function () {
  const student = this;
  const studentObject = student.toObject();

  delete studentObject.password;

  return studentObject;
};

studentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const token = jwt.sign({
    _id: student._id.toString(),
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKENLIFETIME,
  });

  return token;
};

studentSchema.statics.findByCredentials = async (user_name, password) => {
  const student = await Student.findOne({
    user_name,
  });

  if (!student) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return student;
};

studentSchema.pre('save', async function (next) {
  const student = this;
  if (student.isModified('password')) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

const studentModel = mongoose.model('Student', studentSchema);
module.exports = studentModel;