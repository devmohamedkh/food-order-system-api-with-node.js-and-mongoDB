const app = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/verifyToken");

app.get("/", categoryController.getAllCategory);
app.get("/:id", categoryController.getCategoryById);
app.post("/", verifyAdmin, categoryController.addCategory);
app.patch("/:id", verifyAdmin, categoryController.updateCategory);
app.delete("/:id", verifyAdmin, categoryController.deleteCategoryById);

module.exports = app;
