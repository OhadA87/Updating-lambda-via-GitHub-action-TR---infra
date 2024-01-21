import { errorMessages } from '../../constants/index.js';
import { Like, Animal, Dislike } from '../../models/index.js';

const getNewAnimalsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [likedAnimalIds, dislikedAnimalIds] = await Promise.all([
      Like.find({ userId }).distinct('animalId'),
      Dislike.find({ userId }).distinct('animalId'),
    ]);

    const interactedAnimalIds = [...likedAnimalIds, ...dislikedAnimalIds];

    const nonInteractedAnimals = await Animal.find({
      _id: { $nin: interactedAnimalIds },
    }).limit(20);

    res.json({ animals: nonInteractedAnimals });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default getNewAnimalsByUserId;
