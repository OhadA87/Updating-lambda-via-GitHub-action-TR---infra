import mongoose from 'mongoose';
import { dbModels, animalFields, animals } from '../constants/index.js';

const animalSchema = new mongoose.Schema(
  {
    [animalFields.NAME]: String,
    // @TODO: age => Should be Age&Months, could be just Months (specify months number)
    [animalFields.BIRTH_DAY]: Date,
    [animalFields.BREED]: String,
    [animalFields.SIZE]: String,
    [animalFields.IMAGES]: { type: [String], default: [] },
    [animalFields.DESCRIPTION]: String,
    [animalFields.TYPE]: {
      type: String,
      default: animals.DOG,
    },
    [animalFields.LIKES_COUNT]: { type: Number, default: 0 },
    [animalFields.DISLIKES_COUNT]: { type: Number, default: 0 },
    [animalFields.USER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.USER,
    },
    [animalFields.ACTIVE]: { type: Boolean, default: true },
    [animalFields.HYPOALLERGENIC]: String,
    [animalFields.NEUTERED]: String,
    [animalFields.VACCINATED]: String,
    [animalFields.SHELTER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.SHELTER,
    },
    [animalFields.BRANCH_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dbModels.BRANCH,
    },
  },
  {
    versionKey: false,
  },
);

const animalModel = mongoose.model(dbModels.ANIMAL, animalSchema);
export default animalModel;
