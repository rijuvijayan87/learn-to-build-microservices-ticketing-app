import mongoose from 'mongoose';
import { Password } from '../services/password';

type UserAttributes = {
  email: string;
  password: string;
};

interface UserModel extends mongoose.Model<UserDocument> {
  build(userAttr: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

UserSchema.statics.build = (userAttr: UserAttributes) => {
  return new User(userAttr);
};

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export { User };
