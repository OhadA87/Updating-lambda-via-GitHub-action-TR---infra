import nodemailer from 'nodemailer';
import aws from '@aws-sdk/client-ses';

export const createNodeMailerAwsTransporter = () => {
  const awsCredentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  const ses = new aws.SES({
    apiVersion: '2010-12-01',
    region: 'eu-west-1',
    credentials: awsCredentials,
  });

  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  return transporter;
};
