const Color = require("../models/Colors");

// Create and Save a new Color
exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Color content can not be empty",
    });
  }

  const color = new Color({
    name: req.body.name,
    c_date: new Date(),
  });

  // Save Color in the database
  color
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Color .",
      });
    });
};
exports.findAll = (req, res) => {
  Color.find()
    .then((colors) => {
      res.send(colors);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Colors.",
      });
    });
};
exports.findOne = (req, res) => {
  Color.findById(req.params.id)
    .then((color) => {
      if (!color) {
        return res.status(404).send({
          message: err.message || "Not Color from id" + req.params.id,
        });
      }
      res.send(color);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving color with id " + req.params.id,
      });
    });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Color content can not be empty",
    });
  }

  // Find Color and update it with the request body
  Color.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      c_date: new Date(),
    },
    { new: true }
  )
    .then((color) => {
      if (!color) {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id,
        });
      }
      res.send(color);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating color with id " + req.params.id,
      });
    });
};
exports.delete = (req, res) => {
  Color.findByIdAndRemove(req.params.id)
    .then((color) => {
      if (!color) {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id,
        });
      }
      res.send({ message: "Color deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete color with id " + req.params.id,
      });
    });
};
