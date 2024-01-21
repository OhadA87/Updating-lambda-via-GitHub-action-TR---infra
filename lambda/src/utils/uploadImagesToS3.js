import fs from 'fs';
import { v4 as randomId } from 'uuid';
import { compressImage } from './compressImage.js';
import AWS from 'aws-sdk';

export const uploadImagesToS3 = async ({ images = [], route, maximumSize }) => {
  const AwsConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: 'eu-west-1',
  };

  if (images.length === 0) return [];
  AWS.config.update(AwsConfig);
  const s3 = new AWS.S3();
  const uploadPromises = [];

  for (const file of images) {
    const randomFileName = `${randomId()}_${file.originalname}`;
    const compressedImageBuffer = await compressImage(file.buffer, maximumSize);
    const params = {
      Bucket: 'adoptmetest',
      Key: `Images/${route}/${randomFileName}`,
      Body: compressedImageBuffer,
      ContentType: file.mimetype,
    };

    const uploadPromise = s3.upload(params).promise();
    uploadPromises.push(uploadPromise);
  }

  const s3DataArray = await Promise.all(uploadPromises);
  const imagePaths = s3DataArray.map((s3Data) => s3Data.Location);
  return imagePaths;
};
