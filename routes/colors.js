const router = require("express").Router();
const auth = require("./auth");
const ColorController = require("../controllers/ColorController");

// Create a new Color
router.post("/", auth.required, ColorController.create);

// Retrieve all Color
router.get("/", auth.required, ColorController.findAll);

// Retrieve a single Color with id
router.get("/:id", auth.required, ColorController.findOne);

// Update a Color with id
router.put("/:id", ColorController.update);

// Delete a Color with id
router.delete("/:id", ColorController.delete);

module.exports = router;
