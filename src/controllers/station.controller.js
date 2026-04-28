import PoliceStation from '../models/PoliceStation.js';

// @desc    Get all stations
// @route   GET /api/stations
// @access  Private
export const getStations = async (req, res, next) => {
  try {
    const { district, province } = req.query;
    const filter = {};
    if (district) filter.district = district;
    if (province) filter.province = province;

    const stations = await PoliceStation.find(filter)
      .populate('district', 'name')
      .populate('province', 'name');

    res.status(200).json({ success: true, count: stations.length, data: stations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single station
// @route   GET /api/stations/:id
// @access  Private
export const getStation = async (req, res, next) => {
  try {
    const station = await PoliceStation.findById(req.params.id)
      .populate('district', 'name')
      .populate('province', 'name');

    if (!station) {
      res.status(404);
      throw new Error('Station not found');
    }

    res.status(200).json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

// @desc    Create station
// @route   POST /api/stations
// @access  Private/Admin
export const createStation = async (req, res, next) => {
  try {
    const station = await PoliceStation.create(req.body);
    res.status(201).json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

// @desc    Update station
// @route   PUT /api/stations/:id
// @access  Private/Admin
export const updateStation = async (req, res, next) => {
  try {
    const station = await PoliceStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!station) {
      res.status(404);
      throw new Error('Station not found');
    }

    res.status(200).json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete station
// @route   DELETE /api/stations/:id
// @access  Private/Admin
export const deleteStation = async (req, res, next) => {
  try {
    const station = await PoliceStation.findByIdAndDelete(req.params.id);

    if (!station) {
      res.status(404);
      throw new Error('Station not found');
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};