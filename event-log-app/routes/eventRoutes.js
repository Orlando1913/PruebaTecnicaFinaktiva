const express = require('express');
const router = express.Router();
const EventLog = require('../models/EventLog');
const mongoose = require('mongoose');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new event
 *     description: Register a new event with description and event type.
 *     parameters:
 *       - in: body
 *         name: event
 *         description: Event object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *             eventType:
 *               type: string
 *     responses:
 *       201:
 *         description: Event registered successfully
 *       400:
 *         description: Bad request, all fields are required
 *       500:
 *         description: Internal server error
 */
router.post('/register', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { description, eventType } = req.body;
        
        if (!description || !eventType) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const eventLog = new EventLog({ description, eventType });
        await eventLog.save({ session });

        await session.commitTransaction();
        res.status(201).json(eventLog);
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error registrando el evento", error: err.message });
    } finally {
        session.endSession();
    }
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for events
 *     description: Retrieve events based on event type and date range.
 *     parameters:
 *       - in: query
 *         name: eventType
 *         required: false
 *         description: Type of event to filter by.
 *         type: string
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Start date for filtering events.
 *         type: string
 *         format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: End date for filtering events.
 *         type: string
 *         format: date
 *     responses:
 *       200:
 *         description: A list of events matching the criteria
 *       500:
 *         description: Internal server error
 */
router.get('/search', async (req, res) => {
    const { eventType, startDate, endDate } = req.query;

    let filters = {};
    if (eventType) filters.eventType = eventType;
    if (startDate && endDate) filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };

    try {
        const events = await EventLog.find(filters);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: "Error consultando los eventos", error: err.message });
    }
});

module.exports = router;
