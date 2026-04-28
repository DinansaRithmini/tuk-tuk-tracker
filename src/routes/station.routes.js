import express from 'express';
import {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
} from '../controllers/station.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getStations)
  .post(protect, authorize('hq_admin'), createStation);

router.route('/:id')
  .get(protect, getStation)
  .put(protect, authorize('hq_admin'), updateStation)
  .delete(protect, authorize('hq_admin'), deleteStation);

export default router;