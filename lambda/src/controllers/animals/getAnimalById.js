import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { Animal } from '../../models/index.js';

const getAnimalById = async (req, res) => {
  const { animalId } = req.params;
  try {
    const animal = await Animal.findById(animalId);
    return res.status(200).json({ animal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getAnimalById;
