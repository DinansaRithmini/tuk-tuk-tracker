import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Location route working' }));

export default router;