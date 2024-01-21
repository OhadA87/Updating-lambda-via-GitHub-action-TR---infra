import User from '../../models/user.js';
import { userFields } from '../../constants/index.js';

const onBoardQuestions = async (req, res) => {
  try {
    const { userId, questionsData } = req.body;
    await User.findByIdAndUpdate(userId, {
      [userFields.COMPLETED_ON_BOARD_QUESTIONS]: questionsData,
    });
    return res.status(200).json({
      message: 'OnBoarding submited successfully',
    });
  } catch (err) {
    res.status(500).send('Sever issue');
  }
};

export default onBoardQuestions;
