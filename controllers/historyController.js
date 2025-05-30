const History = require('../model/History');
const Event = require('../model/Event');

exports.createHistory = async (req, res) => {
  try {
    const { idEvent, idTicket, account } = req.body;

    if (!idEvent || !idTicket || !account) {
      return res.status(400).json({
        status: 'fail',
        message: 'idHistory, idEvent, dan account is required.'
      });
    }

    const newHistory = new History({idEvent, idTicket, account });
    const savedHistory = await newHistory.save();

    res.status(200).json({
      status: 'success',
      message: 'History created',
      data: savedHistory
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create history',
      error: err.message
    });
  }
};

exports.getAllHistories = async (req, res) => {
  try {
    const histories = await History.find();

    const historiesWithEvent = await Promise.all(
        histories.map(async (history) => {
          const event = await Event.findById(history.idEvent);
          return {
            ...history.toObject(),
            event: event || null, 
          };
        })
      );
    res.status(200).json({
      status: 'success',
      data: historiesWithEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get all histories',
      error: err.message
    });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const history = await History.findByIdAndDelete(id);

    if (!history) {
      return res.status(404).json({
        status: 'fail',
        message: `History not found.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'History deleted',
      data: history
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete history',
      error: err.message
    });
  }
};

exports.updateHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const { idEvent, idTicket, account } = req.body;

    const updatedHistory = await History.findByIdAndUpdate(
      id,
      { idEvent, idTicket, account },
      { new: true }
    );

    if (!updatedHistory) {
      return res.status(404).json({
        status: 'fail',
        message: 'History not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'History updated.',
      data: updatedHistory
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update history.',
      error: err.message
    });
  }
};
