import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: 300,
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.password || !this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 12)
  return next()
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  if (!this.password) {
    return false
  }

  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    delete returnedObject.password
    delete returnedObject.__v
    return returnedObject
  },
})

const User = mongoose.model('User', userSchema)

export default User
