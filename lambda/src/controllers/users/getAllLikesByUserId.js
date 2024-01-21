import { errorMessages } from '../../constants/index.js';
import { Like, Animal } from '../../models/index.js';

const getAllLikesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const likes = await Like.find({ userId });
    const animalIds = likes.map(({ animalId }) => animalId);
    const animals = await Animal.find({ _id: { $in: animalIds } });
    return res.status(200).json({ animals, likes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default getAllLikesByUserId;
