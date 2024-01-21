import mongoose from 'mongoose';
import { dbModels, branchFields } from '../constants/index.js';

const branchSchema = new mongoose.Schema(
  {
    [branchFields.LOCATION]: String,
    [branchFields.CONTACT_NAME]: String,
    [branchFields.CONTACT_INFO]: String,
    [branchFields.SHELTER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.SHELTER,
    },
    [branchFields.ACTIVE]: { type: Boolean, default: true },
    [branchFields.ANIMAL_COUNT]: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  },
);

const branchModel = mongoose.model(dbModels.BRANCH, branchSchema);
export default branchModel;
