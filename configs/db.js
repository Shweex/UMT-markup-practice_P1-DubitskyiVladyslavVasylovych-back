const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions:
    process.env.DB_SSL === 'true'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');

    require('../models');
    await sequelize.sync();

    const { seedIfEmpty } = require('../services/seedService');
    await seedIfEmpty();
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDatabase };
