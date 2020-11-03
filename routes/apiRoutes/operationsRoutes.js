const router = require('express').Router();
const OperationsController = require("./../../controllers/operationsController")

router.route("/thisday")
    .get(OperationsController.getThisDaySummary)
router.route("/thismonth")
    .get(OperationsController.getThisMonthSummary)
router.route("/daily")
    .post(OperationsController.getDailySummary)
router.route("/monthly")
    .post(OperationsController.getMonthlySummary)
router.route("/client")
    .post(OperationsController.getClientSummary)
router.route("/input")
    .post(OperationsController.inputTransaction)
router.route("/inventory")
    .post(OperationsController.inventoryUpdate)
router.route("/summary")
    .get(OperationsController.mainPageData)
router.route("/delete")
    .post(OperationsController.deleteTransaction)

module.exports = router;