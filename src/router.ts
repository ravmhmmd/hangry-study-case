import express from "express";
const router = express.Router();

// Import controller files
const locationController = require("./controller/location");
const menusController = require("./controller/menus");
const cartsController = require("./controller/carts");
const checkoutController = require("./controller/checkout");

// Routes for different API endpoint groups
router.use("/location", locationController);
router.use("/menu", menusController);
router.use("/cart", cartsController);
router.use("/checkout", checkoutController);

module.exports = router;
