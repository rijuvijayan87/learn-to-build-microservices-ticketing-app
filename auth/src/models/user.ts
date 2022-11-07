import mongoose from 'mongoose';

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

UserSchema.statics.build = (userAttr: UserAttributes) => {
  new User(userAttr);
};

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export { User };
