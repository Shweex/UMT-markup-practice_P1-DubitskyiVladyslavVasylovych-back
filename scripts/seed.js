require('dotenv').config();

const { connectDatabase } = require('../configs/db');
const Bouquet = require('../models/Bouquet');
const { seedData } = require('../services/seedService');
const { getGravatarUrl } = require('../helpers/gravatar');

async function seed() {
  await connectDatabase();

  const count = await Bouquet.count();
  if (count > 0) {
    console.log('Database already contains bouquets. Seed skipped.');
    process.exit(0);
  }

  for (const item of seedData) {
    await Bouquet.create({
      ...item,
      photoURL: getGravatarUrl(item.title),
    });
  }

  console.log(`Seeded ${seedData.length} bouquets.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
