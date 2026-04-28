import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  ownerName: { type: String, required: true },
  ownerNIC: { type: String, required: true },
  ownerContact: { type: String },
  deviceId: { type: String, required: true, unique: true },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'PoliceStation' },
  isActive: { type: Boolean, default: true },
  lastLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date },
  },
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);