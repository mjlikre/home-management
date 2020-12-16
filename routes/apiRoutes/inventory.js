const router = require('express').Router();
const inventoryController = require('./../../controllers/inventoryController');

// /api/auth/signup
router.route("/get")
  .post(inventoryController.getInventory);
router.route('/update')
  .post(inventoryController.updateInventory);

router.route("/new")
  .post(inventoryController.inputInventory);



module.exports = router;