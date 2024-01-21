import { Branch } from '../../models/index.js';
import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/serverErrors.js';

const getAllBranches = async (_, res) => {
  try {
    const branches = await Branch.find({});
    return res.status(200).json({ branches });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getAllBranches;
