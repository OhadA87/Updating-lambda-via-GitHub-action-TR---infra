import { GENERAL_SERVER_ERROR } from '../../constants/errorMessages/index.js';
import { Branch } from '../../models/index.js';

const getAllBranchesByShelterId = async (req, res) => {
  const { shelterId } = req.params;
  try {
    const branches = await Branch.find({ shelterId });
    return res.status(200).json({ shelterId, branches });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: GENERAL_SERVER_ERROR });
  }
};

export default getAllBranchesByShelterId;
