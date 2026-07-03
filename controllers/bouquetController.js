const bouquetService = require('../services/bouquetService');
const HttpError = require('../helpers/HttpError');

async function getAll(req, res, next) {
  try {
    const bouquets = await bouquetService.getAllBouquets();
    res.status(200).json(bouquets);
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const bouquet = await bouquetService.getBouquetById(req.params.id);
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const bouquet = await bouquetService.createBouquet(req.body);
    res.status(201).json(bouquet);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new HttpError(400, 'Request body cannot be empty');
    }

    const bouquet = await bouquetService.updateBouquet(req.params.id, req.body);
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const result = await bouquetService.deleteBouquet(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateFavorite(req, res, next) {
  try {
    const bouquet = await bouquetService.updateFavorite(req.params.id, req.body.favorite);
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

async function updatePhoto(req, res, next) {
  try {
    const bouquet = await bouquetService.updatePhoto(req.params.id, req.file);
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateFavorite,
  updatePhoto,
};
