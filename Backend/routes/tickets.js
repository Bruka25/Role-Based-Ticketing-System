const express = require("express");
const Ticket = require("../models/Ticket");
const { verifyToken } = require("../utils/jwt");

const router = express.Router();

router.post("/tickets", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const ticket = new Ticket({ title, description, createdBy: req.user.userId });
  await ticket.save();
  res.status(201).json(ticket);
});

router.get("/tickets", verifyToken, async (req, res) => {
  if (req.user.role === "admin") {
    const tickets = await Ticket.find().populate("createdBy", "username");
    return res.json(tickets);
  }
  const tickets = await Ticket.find({ createdBy: req.user.userId });
  res.json(tickets);
});

router.put("/tickets/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can update tickets" });
  }
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(ticket);
});

module.exports = router;
