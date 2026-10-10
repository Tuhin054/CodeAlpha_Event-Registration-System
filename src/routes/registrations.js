const express = require("express");
const { createRegistration } = require("../controllers/registrations-controller");
const validateRequest = require("../middleware/validate-request");
const { validateRegistrationIds } = require("../middleware/validators");

const router = express.Router();

router.post(
  "/",
  validateRegistrationIds,
  validateRequest,
  createRegistration
);

module.exports = router;
