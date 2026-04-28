import Vehicle from '../models/Vehicle.js';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
export const getVehicles = async (req, res, next) => {
  try {
    const { province, district, isActive } = req.query;
    const filter = {};
    if (province) filter.province = province;
    if (district) filter.district = district;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const vehicles = await Vehicle.find(filter)
      .populate('province', 'name')
      .populate('district', 'name')
      .populate('station', 'name');

    res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Private
export const getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('province', 'name')
      .populate('district', 'name')
      .populate('station', 'name');

    if (!vehicle) {
      res.status(404);
      throw new Error('Vehicle not found');
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

// @desc    Create vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
export const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
export const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      res.status(404);
      throw new Error('Vehicle not found');
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
export const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      res.status(404);
      throw new Error('Vehicle not found');
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};