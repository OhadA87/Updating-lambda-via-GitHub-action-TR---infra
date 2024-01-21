import { Like, Dislike } from '../../models/index.js';
import { errorMessages } from '../../constants/index.js';

const switchLikeToDislike = async (req, res) => {
  const { interactionId } = req.params;

  try {
    const like = await Like.findByIdAndRemove(interactionId);

    if (!like)
      return res
        .status(404)
        .json({ error: errorMessages.INTERACTION_CANNOT_FIND });

    const { userId, animalId } = like;
    const dislike = await Dislike.create({ userId, animalId });
    return res.status(200).json({ dislike });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default switchLikeToDislike;
