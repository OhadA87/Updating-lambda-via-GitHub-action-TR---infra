import { Branch, Shelter } from '../../models/index.js';
import { branchFields } from '../../constants/index.js';
import { errorMessages } from '../../constants/index.js';

const addBranchToDb = async ({
  shelterId,
  location,
  contactName,
  contactInfo,
}) =>
  await Branch.create({
    [branchFields.SHELTER_ID]: shelterId,
    [branchFields.LOCATION]: location,
    [branchFields.CONTACT_INFO]: contactInfo,
    [branchFields.CONTACT_NAME]: contactName,
  });

const updateShelterBranchesCount = async (_id) =>
  await Shelter.findOneAndUpdate(
    { _id },
    { $inc: { branchesCount: 1 } },
    { new: true },
  );

const createBranch = async (req, res) => {
  const { shelterId, location, contactName, contactInfo } = req.body;
  try {
    const updateCountPromise = updateShelterBranchesCount(shelterId);
    const addBranchPromise = addBranchToDb({
      shelterId,
      location,
      contactName,
      contactInfo,
    });
    const [branch] = await Promise.all([addBranchPromise, updateCountPromise]);
    return res.status(200).json({ branch });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default createBranch;
