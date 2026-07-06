const Bouquet = require('../models/Bouquet');
const { getGravatarUrl } = require('../helpers/gravatar');

const seedData = [
  {
    title: 'Floral Melody',
    description:
      'Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring.',
    price: 35,
    favorite: false,
  },
  {
    title: 'Blush Romance',
    description:
      'Romantic blush petals arranged with care for heartfelt moments and special celebrations.',
    price: 40,
    favorite: true,
  },
  {
    title: 'Pastel Garden',
    description:
      'A garden-inspired palette of pastel blooms that brings warmth and charm to any room.',
    price: 38,
    favorite: false,
  },
  {
    title: 'Spring Elegance',
    description:
      'Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring.',
    price: 55,
    favorite: true,
  },
];

async function seedIfEmpty() {
  const count = await Bouquet.count();
  if (count > 0) return;

  for (const item of seedData) {
    await Bouquet.create({
      ...item,
      photoURL: getGravatarUrl(item.title),
    });
  }

  console.log(`Seeded ${seedData.length} bouquets.`);
}

module.exports = { seedIfEmpty, seedData };
