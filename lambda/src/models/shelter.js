import mongoose from 'mongoose';
import { dbModels, shelterFields } from '../constants/index.js';

const shelterSchema = new mongoose.Schema(
  {
    [shelterFields.NAME]: String,
    [shelterFields.CONTACT_INFO]: String,
    [shelterFields.IDENTIFIER_NUMBER]: String,
    [shelterFields.BRANCHES_COUNT]: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  },
);

const shelterModel = mongoose.model(dbModels.SHELTER, shelterSchema);
export default shelterModel;
