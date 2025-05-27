const Event = require('../model/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const { idEvent, name, location, description, image } = req.body;

        if (!idEvent || !name || !location || !description || !image) {
            return res.status(400).json({
                status: 'fail',
                message: 'idEvent, name, location, desc, image wajib diisi.'
            });
        }

        const newEvent = new Event({ idEvent, name, location, description, image });
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
    const idEvent = req.params.idEvent;
    const event = await Event.findOneAndDelete({idEvent: idEvent});

    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: `Event dengan idEvent '${idEvent}' tidak ditemukan.`
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
    const idEvent = req.params.idEvent;
    const { name, location, description, image } = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { idEvent }, // cari berdasarkan idEvent (field yang kamu buat sendiri)
      { name, location, description, image },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event tidak ditemukan.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Event berhasil diperbarui.',
      data: updatedEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengupdate Event.',
      error: err.message
    });
  }
};


