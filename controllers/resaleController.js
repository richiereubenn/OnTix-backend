const History = require('../model/History');
const Event = require('../model/Event');
const Resale = require('../model/Resale');

exports.createResale = async (req, res) => {
  try {
    const { idEvent, idTicket } = req.body;

    if (!idEvent || !idTicket) {
      return res.status(400).json({
        status: 'fail',
        message: 'idHistory, idEvent is required.'
      });
    }

    const newResale = new Resale({ idEvent, idTicket });
    const savedResale = await newResale.save();

    res.status(200).json({
      status: 'success',
      message: 'Resale created',
      data: savedResale
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create resale',
      error: err.message
    });
  }
};

exports.getAllResales = async (req, res) => {
  try {
    const resales = await Resale.find();
    const resalesWithEvent = await Promise.all(
      resales.map(async (resale) => {
        const event = await Event.findById(resale.idEvent);
        return {
          ...resale.toObject(),
          event: event || null,
        };
      })
    );
    res.status(200).json({
      status: 'success',
      data: resalesWithEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get all resales',
      error: err.message
    });
  }
};

exports.deleteResale = async (req, res) => {
  try {
    const id = req.params.id;
    const resale = await Resale.findByIdAndDelete(id);

    if (!resale) {
      return res.status(404).json({
        status: 'fail',
        message: `Resale not found.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Resale deleted',
      data: resale
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete resale',
      error: err.message
    });
  }
};

exports.updateResale = async (req, res) => {
  try {
    const id = req.params.id;
    const { idEvent, idTicket } = req.body;

    const updatedResale = await Resale.findByIdAndUpdate(
      id,
      { idEvent, idTicket },
      { new: true }
    );

    if (!updatedResale) {
      return res.status(404).json({
        status: 'fail',
        message: 'Resale not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Resale updated.',
      data: updatedResale
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update resale.',
      error: err.message
    });
  }
};