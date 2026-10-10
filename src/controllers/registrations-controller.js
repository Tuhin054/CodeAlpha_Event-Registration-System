const Event = require("../models/event");
const Registration = require("../models/registration");
const User = require("../models/user");

async function createRegistration(req, res, next) {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Reuse an existing registration, including one that was cancelled earlier.
    const registration = await Registration.findOneAndUpdate(
      { user: userId, event: eventId },
      { $set: { status: "registered", cancelledAt: null } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).populate("event");

    return res.status(201).json(registration);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createRegistration };
