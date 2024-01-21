import mongoose from 'mongoose';
import { dbModels, userFields, roles } from '../constants/index.js';

const userSchema = new mongoose.Schema(
  {
    [userFields.FIRST_NAME]: String,
    [userFields.LAST_NAME]: String,
    [userFields.EMAIL]: String,
    [userFields.PASSWORD]: String,
    [userFields.PICTURE]: String,
    [userFields.COUNTRY]: { type: String, default: 'Israel' },
    [userFields.LOCATION]: String,
    [userFields.AGE]: { type: Number, min: 13, max: 120, default: null },
    [userFields.EMAIL_CONFIRMATION_CODE]: String,
    [userFields.ACTIVE]: Boolean,
    [userFields.GOOGLE]: {
      email: String,
    },
    [userFields.FACEBOOK]: {
      email: String,
    },
    [userFields.COMPLETED_ON_BOARD_QUESTIONS]: { type: Object, default: null },
    // preferences: {
    //   breed: String,
    //   age: Number,
    //   size: String,
    //   default: null,
    // },
    [userFields.ROLE]: {
      type: String,
      enum: [roles.ADMIN, roles.USER, roles.SHELTER],
      default: roles.USER,
    },
    [userFields.SHELTER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.SHELTER,
      required: false,
    },
  },
  {
    versionKey: false,
  },
);

const userModel = mongoose.model(dbModels.USER, userSchema);
export default userModel;
