const express = require("express");
const {
  cancelRegistration,
  createUser,
  getUserRegistrations,
} = require("../controllers/users-controller");
const validateRequest = require("../middleware/validate-request");
const {
  validateCancellationIds,
  validateCreateUser,
  validateUserId,
} = require("../middleware/validators");

const router = express.Router();

router.post(
  "/",
  validateCreateUser,
  validateRequest,
  createUser
);
router.get(
  "/:userId/registrations",
  validateUserId,
  validateRequest,
  getUserRegistrations
);
router.delete(
  "/:userId/registrations/:registrationId",
  validateCancellationIds,
  validateRequest,
  cancelRegistration
);

module.exports = router;
