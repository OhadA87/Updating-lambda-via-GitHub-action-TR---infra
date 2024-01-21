import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://adoptme:${process.env.MONGO_PASSWORD}@adoptme.9amvw1j.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    const client = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxIdleTimeMS: 270000,
      minPoolSize: 2,
      maxPoolSize: 4,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("Succefully connected to DB!");
    return client;
  } catch (err) {
    console.log("database connection failed. exiting now...");
    console.error(err);
    process.exit(1);
  }
};

export default connect;
