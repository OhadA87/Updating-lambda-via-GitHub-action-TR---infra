import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { Shelter } from '../../models/index.js';

const getShelter = async (req, res) => {
  const { shelterId } = req.params;
  try {
    const shelter = await Shelter.findById(shelterId);
    return res.status(200).json({ shelter });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getShelter;
