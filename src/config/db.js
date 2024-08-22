import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',
  database: 'myproject',    
  password: 'admin123',  
  port: 5432,     
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL Database');
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

export default pool;
export { connectDb };
