import express from 'express';
import District from '../models/District.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const { province } = req.query;
    const filter = province ? { province } : {};
    const districts = await District.find(filter).populate('province', 'name');
    res.status(200).json({ success: true, count: districts.length, data: districts });
  } catch (error) { next(error); }
});

router.post('/', protect, authorize('hq_admin'), async (req, res, next) => {
  try {
    const district = await District.create(req.body);
    res.status(201).json({ success: true, data: district });
  } catch (error) { next(error); }
});

export default router;