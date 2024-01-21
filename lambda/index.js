import express from 'express';
import dotenv from 'dotenv';
import {
  setAccessControlHeaders,
  verifyToken,
} from './src/middlewares/index.js';
import cors from 'cors';
import dbConnect from './src/config/database.js';
import cookieParser from 'cookie-parser';
import * as routes from './src/routes/index.js';
import serverless from 'serverless-http';

dotenv.config();
let cachedClient;
if (!cachedClient) {
  cachedClient = dbConnect();
}

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  // credentials: true,
  // origin: 'localhost:19006',
};

app.use(setAccessControlHeaders);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', routes.auth);
app.use('/shelters', verifyToken, routes.shelters);
app.use('/branches', verifyToken, routes.branches);
app.use('/users', verifyToken, routes.users);
app.use('/animals', verifyToken, routes.animals);
app.use('/interactions', verifyToken, routes.interactions);
app.use('/', routes.root);

app.all('/{proxy+}', async (req, res) => {
  const proxyPath = req.params.proxy;

  try {
    const lambdaResponse = await handleLambdaProxy(req, proxyPath || '');
    console.warn('lambda Response:');
    const statusCode =
      lambdaResponse.statusCode || lambdaResponse.status || 500;
    const body =
      lambdaResponse.body ||
      JSON.stringify({ message: 'Internal Server Error!! :(' });

    res.status(statusCode).send(body);
  } catch (err) {
    console.error('err -> ', err);
    res.status(500).json({ message: 'Internal Server Error!! :(' });
  }
});

export const handler = serverless(app);

if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}

async function handleLambdaProxy(req, proxyPath) {
  const lambdaHandler = serverless(app);

  return new Promise(async (resolve, reject) => {
    const event = {
      httpMethod: req.method,
      path: `/${proxyPath}`,
      headers: req.headers,
      queryStringParameters: req.query,
      body: JSON.stringify(req.body),
    };

    try {
      const lambdaResponse = await lambdaHandler(event, {
        functionName: 'lambda-tf-github-actions-demo',
      });
      resolve(lambdaResponse);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// test