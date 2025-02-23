const moongose = require("mongoose");

const connectDB = async () => {
  if (!process.env.SKYLINE_VISTA_MONGO_URI) {
    console.error(" --- ## --- MONGODB_URI is not set in env --- ## ---");
    process.exit(1);
  }
  try {
    const conn = await moongose.connect(process.env.SKYLINE_VISTA_MONGO_URI, {
      dbName: process.env.SKYLINE_VISTA_MONGO_DB_NAME,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
