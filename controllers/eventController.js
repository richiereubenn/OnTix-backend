const Event = require('../model/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const { name, location, description, image } = req.body;

        if (!name || !location || !description || !image) {
            return res.status(400).json({
                status: 'fail',
                message: 'idEvent, name, location, desc, image is required.'
            });
        }

        const newEvent = new Event({ name, location, description, image });
        const savedEvent = await newEvent.save();
    res.status(200).json({
      status: "success",
      message: "Event created",
      savedEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: "Failed to create event",
      error: err.message
    })
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: "Failed to get all event",
      error: err.message
    })
  }
};

exports.deleteEvents = async (req, res) => {
  try{
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: `Event not found.`
      });
    }

    res.status(200).json({
      event,
      status: "success",
      message: "Event deleted"
    });
  }catch (err) {
    res.status(500).json({
      status: 'error',
      message: "Failed to delete event",
      error: err.message
    })
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, location, description, image } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      { name, location, description, image },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Event updated.',
      data: updatedEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update Event.',
      error: err.message
    });
  }
};


