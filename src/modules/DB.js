import mongoose from "mongoose";

const DB = () => {
  if (process.env.MONGODB) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    return mongoose.connect(process.env.MONGODB, options);
  } else {
    return new Promise((resolve, reject) => {
      reject("Set MONGODB url in env");
    });
  }
};

export default DB;
