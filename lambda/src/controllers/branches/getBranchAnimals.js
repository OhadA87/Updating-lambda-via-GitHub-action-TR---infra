import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { animalFields } from '../../constants/index.js';
import { Animal } from '../../models/index.js';

const activeAnimalsFirstQuery = { [animalFields.ACTIVE]: -1 };

const getBranchAnimals = async (req, res) => {
  const { branchId } = req.params;
  try {
    const animals = await Animal.find({ branchId }).sort(
      activeAnimalsFirstQuery,
    );
    return res.status(200).json({ branchId, animals });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getBranchAnimals;
