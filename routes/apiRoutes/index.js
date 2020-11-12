const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const authMiddleware = require('./../../middlewares/authMiddlewares');
const operationsRoutes = require("./operationsRoutes")
// / api prepended to these routes

router.route('/test')
  .get(authMiddleware.requireAuth, (req, res) => {
    console.log(req.user, "i got here")
    console.log(req.headers)
    res.send(req.user);
  });

router.use('/auth', authRoutes);
router.use("/operations", operationsRoutes)


module.exports = router;