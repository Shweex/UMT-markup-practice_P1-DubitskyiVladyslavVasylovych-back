const express = require('express');
const bouquetController = require('../controllers/bouquetController');
const validateBody = require('../middleware/validateBody');
const bouquetCreateSchema = require('../schemas/bouquetCreateSchema');
const bouquetUpdateSchema = require('../schemas/bouquetUpdateSchema');
const bouquetFavoriteSchema = require('../schemas/bouquetFavoriteSchema');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.get('/', bouquetController.getAll);
router.get('/:id', bouquetController.getOne);
router.post('/', validateBody(bouquetCreateSchema), bouquetController.create);
router.put('/:id', validateBody(bouquetUpdateSchema), bouquetController.update);
router.delete('/:id', bouquetController.remove);
router.patch('/:id/favorite', validateBody(bouquetFavoriteSchema), bouquetController.updateFavorite);
router.patch('/:id/photo', upload.single('photo'), bouquetController.updatePhoto);

module.exports = router;
