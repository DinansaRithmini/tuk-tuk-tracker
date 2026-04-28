import express from 'express';
import {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getVehicles)
  .post(protect, authorize('hq_admin', 'station_officer'), createVehicle);

router.route('/:id')
  .get(protect, getVehicle)
  .put(protect, authorize('hq_admin', 'station_officer'), updateVehicle)
  .delete(protect, authorize('hq_admin'), deleteVehicle);

export default router;