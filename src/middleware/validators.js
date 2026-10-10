const { body, param } = require("express-validator");

const validateEventId = [
  param("eventId").isMongoId().withMessage("A valid event ID is required"),
];

const validateCreateUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("A valid email is required"),
];

const validateUserId = [
  param("userId").isMongoId().withMessage("A valid user ID is required"),
];

const validateRegistrationIds = [
  body("userId").isMongoId().withMessage("A valid user ID is required"),
  body("eventId").isMongoId().withMessage("A valid event ID is required"),
];

const validateCancellationIds = [
  param("userId").isMongoId().withMessage("A valid user ID is required"),
  param("registrationId")
    .isMongoId()
    .withMessage("A valid registration ID is required"),
];

module.exports = {
  validateCancellationIds,
  validateCreateUser,
  validateEventId,
  validateRegistrationIds,
  validateUserId,
};
