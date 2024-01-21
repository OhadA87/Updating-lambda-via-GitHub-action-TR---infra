import mongoose from 'mongoose';
import { dbModels, interactionFields } from '../constants/index.js';

const likeSchema = new mongoose.Schema(
  {
    [interactionFields.USER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.USER,
    },
    [interactionFields.ANIMAL_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.ANIMAL,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const likeModel = mongoose.model(dbModels.LIKE, likeSchema);
export default likeModel;
