import { Branch } from '../../models/index.js';
import { errorMessages } from '../../constants/index.js';

const updateBranch = async (req, res) => {
  const { branchId } = req.params;
  const { location, contactName, contactInfo } = req.body;
  try {
    const branch = await Branch.findOneAndUpdate(
      { _id: branchId },
      { location, contactName, contactInfo },
      { new: true },
    );
    if (!branch)
      return res.status(404).json({ error: errorMessages.DB_UPDATE_DOC_ERROR });
    return res.status(200).json({ branch });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default updateBranch;
