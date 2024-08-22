import { Sequelize, DataTypes } from 'sequelize';

const db = {
    "username": "postgres",       
    "password": "admin123",   
    "database": "myproject",   
    "host": "localhost",         
    "dialect": "postgres"          
  }

// Initialize Sequelize

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect
});

// Define models
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Connect to database and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Creates tables if they do not exist
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { sequelize, User };
