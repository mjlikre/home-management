const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const authMiddleware = require('./../../middlewares/authMiddlewares');
// / api prepended to these routes

router.route('/test')
  .get(authMiddleware.requireAuth, (req, res) => {
    console.log(req.user, "i got here")
    res.send(req.user);
  });

router.use('/auth', authRoutes);


module.exports = router;