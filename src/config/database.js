import mongoose from 'mongoose';

const connect = async () => {
  // Write here your DB Uri
  const mongoUri = `mongodb+srv://dburiname:${process.env.MONGO_PASSWORD}@dburi.mongodb.net/?`;

  try {
    const client = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxIdleTimeMS: 270000,
      minPoolSize: 2,
      maxPoolSize: 4,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('Succefully connected to DB!');
    return client;
  } catch (err) {
    console.log('database connection failed. exiting now...');
    console.error(err);
    process.exit(1);
  }
};

export default connect;
