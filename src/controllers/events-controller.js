const Event = require("../models/event");

async function getEvents(req, res, next) {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.json(events);
  } catch (error) {
    return next(error);
  }
}

async function getEventById(req, res, next) {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getEventById, getEvents };
