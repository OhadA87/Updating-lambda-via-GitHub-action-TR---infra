import { Shelter } from '../../models/index.js';
import { errorMessages } from '../../constants/index.js';

const updateShelter = async (req, res) => {
  const { shelterId } = req.params;
  const { name, identifierNumber, contactInfo } = req.body;
  try {
    const shelter = await Shelter.findOneAndUpdate(
      { _id: shelterId },
      { name, identifierNumber, contactInfo },
      { new: true },
    );
    if (shelter) return res.status(200).json({ shelter });
    return res.status(404).json({ error: errorMessages.DB_UPDATE_DOC_ERROR });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default updateShelter;
