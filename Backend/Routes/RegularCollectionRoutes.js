const express = require('express');
const router = express.Router();
const regularCollectionController = require('../Controllers/RegularCollectionControllers');

router.get('/', regularCollectionController.getAllRegularCollection);
router.post('/', regularCollectionController.addRegularCollection);
router.get('/:id', regularCollectionController.getById);
router.put('/:id', regularCollectionController.updateRegularCollection);
router.delete('/:id', regularCollectionController.deleteRegularCollection);

module.exports = router;