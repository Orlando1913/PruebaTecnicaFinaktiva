const express = require('express');
const router = express.Router();
const EventLog = require('../models/EventLog');


router.post('/register', async (req, res) =>{
    const {description, eventType } = req.body;
    try {
        if (!description || !eventType) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        const eventLog = new EventLog({description, eventType});
        await eventLog.save();
        res.status(201).json(eventLog);
    } catch (err) {
        res.status(500).json({message: "Error registrando el evento", error: err.message})
    }
});



router.get('/search' , async (req, res) =>{
    const {evenType, startDate, endDate} = req.query;

    let filters = {};
    if(evenType) filters.evenType = evenType;
    if(startDate && endDate) filters.date = {$gte: new Date(startDate), $lte: new Date(endDate)};

    try {
        const events = await EventLog.find(filters);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({message: "Error consultando los eventos", error: err.message});
    }
});


module.exports = router;