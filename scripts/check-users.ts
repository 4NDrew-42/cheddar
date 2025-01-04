const mongoose: typeof import('mongoose') = require('mongoose');
const dotenv: typeof import('dotenv') = require('dotenv');

dotenv.config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    if (!mongoose.connection.db) {
      throw new Error('MongoDB connection failed');
    }
    const userCount = await mongoose.connection.db
      .collection('users')
      .countDocuments();
    console.log(`Total users: ${userCount}`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkUsers();