import mongoose from 'mongoose';
import { dbModels, interactionFields } from '../constants/index.js';

const dislikeSchema = new mongoose.Schema(
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

const dislikeModel = mongoose.model(dbModels.DISLIKE, dislikeSchema);
export default dislikeModel;
