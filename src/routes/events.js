const express = require("express");
const {
  getEventById,
  getEvents,
} = require("../controllers/events-controller");
const validateRequest = require("../middleware/validate-request");
const { validateEventId } = require("../middleware/validators");

const router = express.Router();

router.get("/", getEvents);
router.get(
  "/:eventId",
  validateEventId,
  validateRequest,
  getEventById
);

module.exports = router;
