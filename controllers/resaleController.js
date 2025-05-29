const History = require('../model/History');
const Event = require('../model/Event');
const Resale = require('../model/Resale');

exports.createResale = async (req, res) => {
  try {
    const { idEvent, idTicket } = req.body;

    if (!idEvent || !idTicket) {
      return res.status(400).json({
        status: 'fail',
        message: 'idHistory, idEvent wajib diisi.'
      });
    }

    const newResale = new Resale({idEvent, idTicket });
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
    const resale = await Resale.find();
    res.status(200).json({
      status: 'success',
      data: resale
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
        message: `Resale dengan tidak ditemukan.`
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
    const { idEvent, idTicket} = req.body;

    const updatedResale = await Resale.findByIdAndUpdate(
      id,
      { idEvent, idTicket },
      { new: true }
    );

    if (!updatedResale) {
      return res.status(404).json({
        status: 'fail',
        message: 'Resale tidak ditemukan.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Resale berhasil diperbarui.',
      data: updatedResale
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengupdate resale.',
      error: err.message
    });
  }
};
