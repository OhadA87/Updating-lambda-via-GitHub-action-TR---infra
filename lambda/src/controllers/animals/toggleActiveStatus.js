import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { animalFields } from '../../constants/index.js';
import { Animal } from '../../models/index.js';

const toggleActiveStatus = async (req, res) => {
  const { animalId } = req.params;
  try {
    const animal = await Animal.findById(animalId);
    animal.active = !animal.active;
    const updatedAnimal = await animal.save();
    return res.status(200).json({ animal: updatedAnimal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default toggleActiveStatus;
