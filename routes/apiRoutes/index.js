const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const authMiddleware = require('./../../middlewares/authMiddlewares');
const operationsRoutes = require("./operationsRoutes")
const inventoryRoutes = require('./inventory')
// / api prepended to these routes

router.route('/test')
  .get( (req, res) => {
    console.log( "i got here")
    res.send("success");
  });

router.use('/auth', authRoutes);
router.use("/operations", operationsRoutes)
router.use("/inventory", inventoryRoutes)


module.exports = router;