const Registration = require("../models/registration");
const User = require("../models/user");

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

async function getUserRegistrations(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Include event details in each registration instead of returning only event IDs.
    const registrations = await Registration.find({ user: req.params.userId })
      .populate("event")
      .sort({ createdAt: -1 });
    return res.json(registrations);
  } catch (error) {
    return next(error);
  }
}

async function cancelRegistration(req, res, next) {
  try {
    const { userId, registrationId } = req.params;

    const registration = await Registration.findOne({ _id: registrationId, user: userId });
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    if (registration.status === "cancelled") {
      return res.status(409).json({ error: "Registration is already cancelled" });
    }

    // Keep the record so users can still see that they cancelled.
    registration.status = "cancelled";
    registration.cancelledAt = new Date();
    await registration.save();
    return res.json(registration);
  } catch (error) {
    return next(error);
  }
}

module.exports = { cancelRegistration, createUser, getUserRegistrations };
