module.exports = app => {
    const mongoose = app.mongoose
    const UserSchema = new mongoose.Schema(
      {
        uid: {type: String, required: true, unique: true}, // 用户名
        password: {type: String, required: true}, // 密码
        disabled: {type: String}, //禁用状态
      },
      { timestamps: true } // 自动生成 createdAt 和 updatedAt 时间戳
    )
    return mongoose.model('User', UserSchema, 'user')
  }