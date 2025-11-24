const express = require("express");
const itemController = require("../controllers/ItemController");

const router = express.Router();

router.get("/categories", itemController.listCategories);
router.get("/categories/create", itemController.createCategoryget);
router.post("/categories/create", itemController.createCategorypost);
router.post("/categories/:id/delete", itemController.deleteCategory);
router.get("/categories/:id/update", itemController.updateCategoryGet);
router.post("/categories/:id/update", itemController.updateCategoryPost);
router.get("/categories/:id/details", itemController.categoryDetails)
router.get("/items/create", itemController.createItemForm);
router.post("/items/create", itemController.createItem)
router.post("/items/delete", itemController.deleteItem)
router.get("/items/:id/update", itemController.editItem);
router.post("/items/:id/update", itemController.editItemPost);


module.exports = router;