import { errorMessages } from '../../constants/index.js';

const S3_FILE_URL =
  'https://adoptmetest.s3.eu-west-1.amazonaws.com/staticJsons/citiesOfIsrael.json';

const getCitiesOfIsrael = async (_, res) => {
  try {
    const response = await fetch(S3_FILE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }

    const { cities } = await response.json();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorMessages.GENERAL_SERVER_ERROR });
  }
};

export default getCitiesOfIsrael;
