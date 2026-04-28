import express from 'express';
import {
  postPing,
  getLastLocation,
  getHistory,
  getActiveVehicles,
} from '../controllers/location.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/ping', protect, authorize('hq_admin', 'device', 'station_officer'), postPing);
router.get('/active', protect, getActiveVehicles);
router.get('/:vehicleId/last', protect, getLastLocation);
router.get('/:vehicleId/history', protect, getHistory);

export default router;