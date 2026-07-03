const Bouquet = require('../models/Bouquet');
const HttpError = require('../helpers/HttpError');
const { getGravatarUrl } = require('../helpers/gravatar');
const { formatBouquet } = require('../helpers/formatBouquet');
const { movePhotoFromTemp, removeTempFile } = require('../middleware/upload');

async function getAllBouquets() {
  const bouquets = await Bouquet.findAll({ order: [['id', 'ASC']] });
  return bouquets.map(formatBouquet);
}

async function getBouquetById(id) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    throw new HttpError(404, 'Not found');
  }
  return formatBouquet(bouquet);
}

async function createBouquet(payload) {
  const bouquet = await Bouquet.create({
    title: payload.title,
    description: payload.description,
    price: payload.price,
    favorite: payload.favorite ?? false,
    photoURL: getGravatarUrl(payload.title),
  });

  return formatBouquet(bouquet);
}

async function updateBouquet(id, payload) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    throw new HttpError(404, 'Not found');
  }

  await bouquet.update(payload);
  return formatBouquet(bouquet);
}

async function deleteBouquet(id) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    throw new HttpError(404, 'Not found');
  }

  await bouquet.destroy();
  return { message: 'Bouquet deleted successfully' };
}

async function updateFavorite(id, favorite) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    throw new HttpError(404, 'Not found');
  }

  await bouquet.update({ favorite });
  return formatBouquet(bouquet);
}

async function updatePhoto(id, file) {
  if (!file) {
    throw new HttpError(400, 'File is required');
  }

  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    await removeTempFile(file.filename);
    throw new HttpError(404, 'Not found');
  }

  try {
    const photoPath = await movePhotoFromTemp(file.filename);
    await bouquet.update({ photoURL: photoPath });
    await bouquet.reload();
    return formatBouquet(bouquet);
  } catch (error) {
    await removeTempFile(file.filename);
    throw error;
  }
}

module.exports = {
  getAllBouquets,
  getBouquetById,
  createBouquet,
  updateBouquet,
  deleteBouquet,
  updateFavorite,
  updatePhoto,
};
