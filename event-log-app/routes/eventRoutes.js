const express = require('express');
const router = express.Router();
const EventLog = require('../models/EventLog');
const mongoose = require('mongoose');


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




router.get('/search' , async (req, res) =>{
    const {eventType, startDate, endDate} = req.query;

    let filters = {};
    if(eventType) filters.eventType = eventType;
    if(startDate && endDate) filters.date = {$gte: new Date(startDate), $lte: new Date(endDate)};

    try {
        const events = await EventLog.find(filters);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({message: "Error consultando los eventos", error: err.message});
    }
});


module.exports = router;