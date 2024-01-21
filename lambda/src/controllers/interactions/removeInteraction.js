import { Like, Dislike } from '../../models/index.js';
import { errorMessages, interactions } from '../../constants/index.js';

const removeInteraction = async (req, res) => {
  const { interactionId } = req.params;
  const { interactionType = interactions.LIKE } = req.body;

  try {
    const InteractionModel =
      interactionType === interactions.LIKE ? Like : Dislike;

    await InteractionModel.findByIdAndRemove(interactionId);
    return res.status(200).json({ interactionId, interactionType });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default removeInteraction;
