const asyncHandler = require('express-async-handler')
const helper = require('../helper')
const Event = require('../models/eventModel')
const BloodTypeTrack = require('../models/BloodTypeTrackModel')

// @desc Get Events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    let events = await Event.find()

    events = await Promise.all(events.map(async event => { 
        let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString()).exec()
        let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString()).exec()

        console.log(bloodTypeRegisters)

        bloodTypeRegisters = await helper.removeMongooseExtras(bloodTypeRegisters)
        bloodTypeDemands = await helper.removeMongooseExtras(bloodTypeDemands)

        console.log(bloodTypeRegisters)

        let newEvent = {
            ...event._doc,
            bloodTypeRegisters: bloodTypeRegisters,
            bloodTypeDemands: bloodTypeDemands,
        }

        newEvent = helper.removeMongooseExtras(newEvent)

        return newEvent
        }))

    res.status(200).json(events)
})

// @desc Set Event
// @route POST /api/events/
// @access Private
const setEvent = asyncHandler(async (req, res) => {
    
    // in react end change body.user to user
    /*
    in react change:
        body.user_id -> user.id
        body.user_isMedicalOrganization -> user.isMedicalOrganization
    */ 

    // Check for user
    /*
    if (!req.body.user) {
        res.status(401)
        throw new Error('User not found')
    }
*/
    // Make sure the logged in user is a medical organization
    if (req.body.user_isMedicalOrganization == "false") {
        res.status(401)
        throw new Error('User not authorized')
    }

    const bloodTypeRegisters = await BloodTypeTrack.create({});
    const bloodTypeDemands = await BloodTypeTrack.create({});

    const event = await Event.create({
    medicalOrganization: req.body.user_id,
    date: req.body.date,
    location: req.body.location,
    bloodTypeRegisters: bloodTypeRegisters._id,
    bloodTypeDemands: bloodTypeDemands._id,
    })
    res.status(200).json(event)
})

// @desc Update Event
// @route PUT /api/events/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )

    res.status(200).json(updatedEvent)
})

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    await event.remove()

    res.status(200).json({ id: req.params.id})
})

/*
// @desc Set Event
// @route POST /api/events
// @access Public
const setEvents = asyncHandler(async (req, res) => {
    if(!req.body.text){
        //res.status(400).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error('Please add a text field')
    }

    const event = await Event.create({
        text: req.body.text
    })

    res.status(200).json(event)
})

// @desc Update Event
// @route PUT /api/events/:id
// @access Public
const updateEvents = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )

    res.status(200).json(updatedEvent)
})

// @desc Delete Events
// @route DELETE /api/events/:id
// @access Public
const deleteEvents = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error("Event not found")
    }

    await event.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getEvents, setEvents, updateEvents, deleteEvents
}
*/

module.exports = {
    setEvent, getEvents, updateEvent, deleteEvent
}