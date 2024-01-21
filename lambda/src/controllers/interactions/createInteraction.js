import { Like, Dislike } from '../../models/index.js';
import { errorMessages, interactions } from '../../constants/index.js';

const createInteraction = async (req, res) => {
  const { interactionType, userId, animalId } = req.body;
  try {
    const InteractionModel =
      interactionType === interactions.LIKE ? Like : Dislike;

    const interaction = await InteractionModel.create({
      userId,
      animalId,
    });
    return res.status(200).json({ interaction, interactionType });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default createInteraction;
