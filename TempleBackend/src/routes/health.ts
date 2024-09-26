import express from 'express';
import sequelize from '../config/database';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'Healthy' });
  } catch (error) {
    res.status(500).json({ message: 'Unhealthy' });
  }
});

export default router;