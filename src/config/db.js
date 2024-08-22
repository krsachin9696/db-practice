import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'myProject';
let db;

export const connectDb = async () => {
  try {
    const client = new MongoClient(url);

    await client.connect();
    console.log('Connected successfully to DB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Could not connect to the database', error);
    throw error;
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDb first.');
  }
  return db;
};
