import { Shelter } from '../../models/index.js';
import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/serverErrors.js';

const getAllShelters = async (_, res) => {
  try {
    const shelters = await Shelter.find({});
    return res.status(200).json({ shelters });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getAllShelters;
