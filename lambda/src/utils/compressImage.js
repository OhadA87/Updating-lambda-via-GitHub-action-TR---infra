import sharp from 'sharp';

const KB = 1024;
const MB = 1024 * KB;
const THREE_MB = 3 * MB;

export const compressImage = async (buffer, targetSize = THREE_MB) => {
  let compressedBuffer = buffer;
  let iterations = 0;

  while (compressedBuffer.length > targetSize) {
    compressedBuffer = await sharp(compressedBuffer)
      .jpeg({ quality: 80 })
      .toBuffer();
    iterations++;

    if (iterations > 10) {
      break;
    }
  }

  return compressedBuffer;
};
