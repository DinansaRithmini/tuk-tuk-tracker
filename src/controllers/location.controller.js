import LocationPing from '../models/LocationPing.js';
import Vehicle from '../models/Vehicle.js';

// @desc    Post a location ping (from device)
// @route   POST /api/locations/ping
// @access  Private/Device
export const postPing = async (req, res, next) => {
  try {
    const { vehicleId, latitude, longitude, speed } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      res.status(404);
      throw new Error('Vehicle not found');
    }

    // Save location ping
    const ping = await LocationPing.create({
      vehicle: vehicleId,
      latitude,
      longitude,
      speed,
      district: vehicle.district,
      province: vehicle.province,
      timestamp: new Date(),
    });

    // Update vehicle last known location
    await Vehicle.findByIdAndUpdate(vehicleId, {
      lastLocation: { latitude, longitude, timestamp: new Date() },
    });

    res.status(201).json({ success: true, data: ping });
  } catch (error) {
    next(error);
  }
};

// @desc    Get last known location of a vehicle
// @route   GET /api/locations/:vehicleId/last
// @access  Private
export const getLastLocation = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      res.status(404);
      throw new Error('Vehicle not found');
    }

    res.status(200).json({ success: true, data: vehicle.lastLocation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get location history of a vehicle
// @route   GET /api/locations/:vehicleId/history
// @access  Private
export const getHistory = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const filter = { vehicle: req.params.vehicleId };

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const history = await LocationPing.find(filter)
      .sort({ timestamp: -1 })
      .limit(500);

    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active vehicles in a district/province
// @route   GET /api/locations/active
// @access  Private
export const getActiveVehicles = async (req, res, next) => {
  try {
    const { province, district } = req.query;
    const filter = { isActive: true };
    if (province) filter.province = province;
    if (district) filter.district = district;

    const vehicles = await Vehicle.find(filter)
      .select('registrationNumber lastLocation district province')
      .populate('district', 'name')
      .populate('province', 'name');

    res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error) {
    next(error);
  }
};