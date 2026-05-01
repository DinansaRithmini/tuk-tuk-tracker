import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/swagger/swagger.js';

// Route imports
import authRoutes from './src/routes/auth.routes.js';
import vehicleRoutes from './src/routes/vehicle.routes.js';
import locationRoutes from './src/routes/location.routes.js';
import provinceRoutes from './src/routes/province.routes.js';
import districtRoutes from './src/routes/district.routes.js';
import stationRoutes from './src/routes/station.routes.js';

// Error middleware
import { errorHandler } from './src/middleware/error.middleware.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/stations', stationRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Tuk-Tuk Tracker API is running' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});