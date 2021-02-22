const router = require('express').Router();
const OperationsController = require("./../../controllers/operationsController")
const authMiddleware = require('./../../middlewares/authMiddlewares');

router.route("/client")
    .post(authMiddleware.checkAuth, OperationsController.getClientSummary)
router.route("/input")
    .post(authMiddleware.checkAuth, OperationsController.inputTransaction)
router.route("/inventory")
    .post(authMiddleware.checkAuth, OperationsController.inventoryUpdate)
router.route("/summary")
    .post(authMiddleware.checkAuth, OperationsController.mainPageData)
router.route("/delete")
    .post(authMiddleware.checkAuth, OperationsController.deleteTransaction)
router.route("/sales")
    .post(authMiddleware.checkAuth, OperationsController.salesSummary)
router.route("/insertsales")
    .post(authMiddleware.checkAuth, OperationsController.insertSales)
router.route("/current_cycle")
    .post(authMiddleware.checkAuth, OperationsController.getCurrentCycle)
router.route("/cycle")
    .post(authMiddleware.checkAuth, OperationsController.getAllCycle)
router.route("/specific_cycle")
    .post(authMiddleware.checkAuth, OperationsController.getCycle)
router.route("/edit_sales")
    .post(authMiddleware.checkAuth, OperationsController.editSales)
router.route("/getclient")
    .post(authMiddleware.checkAuth, OperationsController.getClients)
router.route("/inputclient")
    .post(authMiddleware.checkAuth, OperationsController.insertClient)
router.route("/getclientprice")
    .post(authMiddleware.checkAuth, OperationsController.getClientLatestPrice)
router.route("/delrestore")
    .post(authMiddleware.checkAuth, OperationsController.restoreDeleted)
router.route("/getdel")
    .post(authMiddleware.checkAuth, OperationsController.getDeleted)

module.exports = router;