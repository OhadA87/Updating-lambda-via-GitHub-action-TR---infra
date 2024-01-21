import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { animalFields } from '../../constants/index.js';
import { Animal, Branch } from '../../models/index.js';

const toggleAllAnimals = async (branchId, activeStatus) =>
  await Animal.updateMany(
    { branchId: branchId },
    { $set: { [animalFields.ACTIVE]: activeStatus } },
  );

const toggleActiveStatus = async (req, res) => {
  const { branchId } = req.params;
  try {
    const branch = await Branch.findById(branchId);
    branch.active = !branch.active;
    const updateBranch = branch.save();
    const updateAnimals = toggleAllAnimals(branchId, branch.active);
    const [newBranch] = await Promise.all([updateBranch, updateAnimals]);
    return res.status(200).json({ branch: newBranch });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default toggleActiveStatus;
