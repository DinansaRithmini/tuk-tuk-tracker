import express from 'express';
import Province from '../models/Province.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const provinces = await Province.find();
    res.status(200).json({ success: true, count: provinces.length, data: provinces });
  } catch (error) { next(error); }
});

router.post('/', protect, authorize('hq_admin'), async (req, res, next) => {
  try {
    const province = await Province.create(req.body);
    res.status(201).json({ success: true, data: province });
  } catch (error) { next(error); }
});

export default router;