export const setAccessControlHeaders = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://jwt-front-odw9kjsuq-eylonshm.vercel.app',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, *',
  );
  res.header('Access-Control-Allow-Credentials', true);

  return next();
};
