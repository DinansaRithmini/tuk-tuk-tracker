import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Province from '../src/models/Province.js';
import District from '../src/models/District.js';
import PoliceStation from '../src/models/PoliceStation.js';
import Vehicle from '../src/models/Vehicle.js';
import User from '../src/models/User.js';
import LocationPing from '../src/models/LocationPing.js';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected for seeding...');
};

// ─── PROVINCES ───────────────────────────────────────────────
const provinces = [
  { name: 'Western',       code: 'WP' },
  { name: 'Central',       code: 'CP' },
  { name: 'Southern',      code: 'SP' },
  { name: 'Northern',      code: 'NP' },
  { name: 'Eastern',       code: 'EP' },
  { name: 'North Western', code: 'NWP' },
  { name: 'North Central', code: 'NCP' },
  { name: 'Uva',           code: 'UP' },
  { name: 'Sabaragamuwa',  code: 'SGP' },
];

// ─── DISTRICTS ────────────────────────────────────────────────
const getDistricts = (provinceMap) => [
  // Western
  { name: 'Colombo',      code: 'COL', province: provinceMap['WP'] },
  { name: 'Gampaha',      code: 'GAM', province: provinceMap['WP'] },
  { name: 'Kalutara',     code: 'KAL', province: provinceMap['WP'] },
  // Central
  { name: 'Kandy',        code: 'KAN', province: provinceMap['CP'] },
  { name: 'Matale',       code: 'MAT', province: provinceMap['CP'] },
  { name: 'Nuwara Eliya', code: 'NUW', province: provinceMap['CP'] },
  // Southern
  { name: 'Galle',        code: 'GAL', province: provinceMap['SP'] },
  { name: 'Matara',       code: 'MTR', province: provinceMap['SP'] },
  { name: 'Hambantota',   code: 'HAM', province: provinceMap['SP'] },
  // Northern
  { name: 'Jaffna',       code: 'JAF', province: provinceMap['NP'] },
  { name: 'Kilinochchi',  code: 'KIL', province: provinceMap['NP'] },
  { name: 'Mannar',       code: 'MAN', province: provinceMap['NP'] },
  // Eastern
  { name: 'Trincomalee',  code: 'TRI', province: provinceMap['EP'] },
  { name: 'Batticaloa',   code: 'BAT', province: provinceMap['EP'] },
  { name: 'Ampara',       code: 'AMP', province: provinceMap['EP'] },
  // North Western
  { name: 'Kurunegala',   code: 'KUR', province: provinceMap['NWP'] },
  { name: 'Puttalam',     code: 'PUT', province: provinceMap['NWP'] },
  // North Central
  { name: 'Anuradhapura', code: 'ANU', province: provinceMap['NCP'] },
  { name: 'Polonnaruwa',  code: 'POL', province: provinceMap['NCP'] },
  // Uva
  { name: 'Badulla',      code: 'BAD', province: provinceMap['UP'] },
  { name: 'Monaragala',   code: 'MON', province: provinceMap['UP'] },
  // Sabaragamuwa
  { name: 'Ratnapura',    code: 'RAT', province: provinceMap['SGP'] },
  { name: 'Kegalle',      code: 'KEG', province: provinceMap['SGP'] },
  // Extra to reach 25
  { name: 'Vavuniya',     code: 'VAV', province: provinceMap['NP'] },
  { name: 'Mullaitivu',   code: 'MUL', province: provinceMap['NP'] },
];

// ─── POLICE STATIONS ──────────────────────────────────────────
const getStations = (districtMap, provinceMap) => [
  { name: 'Colombo Fort Police Station',    code: 'PS001', district: districtMap['COL'], province: provinceMap['WP'],  address: 'Fort, Colombo 01',        contactNumber: '0112326941' },
  { name: 'Wellawatte Police Station',      code: 'PS002', district: districtMap['COL'], province: provinceMap['WP'],  address: 'Wellawatte, Colombo 06',   contactNumber: '0112584141' },
  { name: 'Gampaha Police Station',         code: 'PS003', district: districtMap['GAM'], province: provinceMap['WP'],  address: 'Gampaha Town',             contactNumber: '0332222222' },
  { name: 'Negombo Police Station',         code: 'PS004', district: districtMap['GAM'], province: provinceMap['WP'],  address: 'Negombo',                  contactNumber: '0312222222' },
  { name: 'Kalutara Police Station',        code: 'PS005', district: districtMap['KAL'], province: provinceMap['WP'],  address: 'Kalutara Town',            contactNumber: '0342222222' },
  { name: 'Kandy Central Police Station',   code: 'PS006', district: districtMap['KAN'], province: provinceMap['CP'],  address: 'Kandy City',               contactNumber: '0812222222' },
  { name: 'Peradeniya Police Station',      code: 'PS007', district: districtMap['KAN'], province: provinceMap['CP'],  address: 'Peradeniya',               contactNumber: '0812388888' },
  { name: 'Matale Police Station',          code: 'PS008', district: districtMap['MAT'], province: provinceMap['CP'],  address: 'Matale Town',              contactNumber: '0662222222' },
  { name: 'Nuwara Eliya Police Station',    code: 'PS009', district: districtMap['NUW'], province: provinceMap['CP'],  address: 'Nuwara Eliya',             contactNumber: '0522222222' },
  { name: 'Galle Police Station',           code: 'PS010', district: districtMap['GAL'], province: provinceMap['SP'],  address: 'Galle Fort',               contactNumber: '0912222222' },
  { name: 'Matara Police Station',          code: 'PS011', district: districtMap['MTR'], province: provinceMap['SP'],  address: 'Matara Town',              contactNumber: '0412222222' },
  { name: 'Hambantota Police Station',      code: 'PS012', district: districtMap['HAM'], province: provinceMap['SP'],  address: 'Hambantota',               contactNumber: '0472222222' },
  { name: 'Jaffna Police Station',          code: 'PS013', district: districtMap['JAF'], province: provinceMap['NP'],  address: 'Jaffna City',              contactNumber: '0212222222' },
  { name: 'Chunnakam Police Station',       code: 'PS014', district: districtMap['JAF'], province: provinceMap['NP'],  address: 'Chunnakam, Jaffna',        contactNumber: '0212333333' },
  { name: 'Trincomalee Police Station',     code: 'PS015', district: districtMap['TRI'], province: provinceMap['EP'],  address: 'Trincomalee Town',         contactNumber: '0262222222' },
  { name: 'Batticaloa Police Station',      code: 'PS016', district: districtMap['BAT'], province: provinceMap['EP'],  address: 'Batticaloa Town',          contactNumber: '0652222222' },
  { name: 'Kurunegala Police Station',      code: 'PS017', district: districtMap['KUR'], province: provinceMap['NWP'], address: 'Kurunegala Town',          contactNumber: '0372222222' },
  { name: 'Puttalam Police Station',        code: 'PS018', district: districtMap['PUT'], province: provinceMap['NWP'], address: 'Puttalam Town',            contactNumber: '0322222222' },
  { name: 'Anuradhapura Police Station',    code: 'PS019', district: districtMap['ANU'], province: provinceMap['NCP'], address: 'Anuradhapura',             contactNumber: '0252222222' },
  { name: 'Polonnaruwa Police Station',     code: 'PS020', district: districtMap['POL'], province: provinceMap['NCP'], address: 'Polonnaruwa Town',         contactNumber: '0272222222' },
  { name: 'Badulla Police Station',         code: 'PS021', district: districtMap['BAD'], province: provinceMap['UP'],  address: 'Badulla Town',             contactNumber: '0552222222' },
  { name: 'Ratnapura Police Station',       code: 'PS022', district: districtMap['RAT'], province: provinceMap['SGP'], address: 'Ratnapura Town',           contactNumber: '0452222222' },
  { name: 'Kegalle Police Station',         code: 'PS023', district: districtMap['KEG'], province: provinceMap['SGP'], address: 'Kegalle Town',             contactNumber: '0352222222' },
  { name: 'Ampara Police Station',          code: 'PS024', district: districtMap['AMP'], province: provinceMap['EP'],  address: 'Ampara Town',              contactNumber: '0632222222' },
  { name: 'Vavuniya Police Station',        code: 'PS025', district: districtMap['VAV'], province: provinceMap['NP'],  address: 'Vavuniya Town',            contactNumber: '0242222222' },
];

// ─── HELPERS ──────────────────────────────────────────────────
const randomBetween = (min, max) => Math.random() * (max - min) + min;

const districtCoordinates = {
  COL: { lat: 6.9271,  lng: 79.8612 },
  GAM: { lat: 7.0917,  lng: 80.0000 },
  KAL: { lat: 6.5854,  lng: 79.9607 },
  KAN: { lat: 7.2906,  lng: 80.6337 },
  MAT: { lat: 7.4675,  lng: 80.6234 },
  NUW: { lat: 6.9497,  lng: 80.7891 },
  GAL: { lat: 6.0535,  lng: 80.2210 },
  MTR: { lat: 5.9549,  lng: 80.5550 },
  HAM: { lat: 6.1241,  lng: 81.1185 },
  JAF: { lat: 9.6615,  lng: 80.0255 },
  KIL: { lat: 9.3932,  lng: 80.4003 },
  MAN: { lat: 8.9810,  lng: 79.9044 },
  TRI: { lat: 8.5874,  lng: 81.2152 },
  BAT: { lat: 7.7310,  lng: 81.6747 },
  AMP: { lat: 7.2975,  lng: 81.6747 },
  KUR: { lat: 7.4818,  lng: 80.3609 },
  PUT: { lat: 8.0362,  lng: 79.8283 },
  ANU: { lat: 8.3114,  lng: 80.4037 },
  POL: { lat: 7.9403,  lng: 81.0188 },
  BAD: { lat: 6.9934,  lng: 81.0550 },
  MON: { lat: 6.8728,  lng: 81.3507 },
  RAT: { lat: 6.7056,  lng: 80.3847 },
  KEG: { lat: 7.2513,  lng: 80.3464 },
  VAV: { lat: 8.7514,  lng: 80.4971 },
  MUL: { lat: 9.2671,  lng: 80.8128 },
};

// Generate location pings for a vehicle over the past week
const generatePings = (vehicleId, districtCode, provinceId, districtId) => {
  const pings = [];
  const base = districtCoordinates[districtCode] || { lat: 7.0, lng: 80.0 };
  const now = new Date();

  // One ping every 30 minutes for 7 days = 336 pings per vehicle
  for (let i = 336; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 30 * 60 * 1000);
    pings.push({
      vehicle: vehicleId,
      latitude:  base.lat + randomBetween(-0.05, 0.05),
      longitude: base.lng + randomBetween(-0.05, 0.05),
      speed: Math.floor(randomBetween(0, 60)),
      timestamp,
      district: districtId,
      province: provinceId,
    });
  }
  return pings;
};

// ─── MAIN SEED FUNCTION ───────────────────────────────────────
const seedData = async () => {
  await connectDB();

  // Clear existing data
  console.log('Clearing existing data...');
  await LocationPing.deleteMany();
  await Vehicle.deleteMany();
  await User.deleteMany();
  await PoliceStation.deleteMany();
  await District.deleteMany();
  await Province.deleteMany();

  // Seed provinces
  console.log('Seeding provinces...');
  const createdProvinces = await Province.insertMany(provinces);
  const provinceMap = {};
  createdProvinces.forEach((p) => { provinceMap[p.code] = p._id; });

  // Seed districts
  console.log('Seeding districts...');
  const createdDistricts = await District.insertMany(getDistricts(provinceMap));
  const districtMap = {};
  createdDistricts.forEach((d) => { districtMap[d.code] = d._id; });

  // Seed police stations
  console.log('Seeding police stations...');
  await PoliceStation.insertMany(getStations(districtMap, provinceMap));

  // Seed admin user
  console.log('Seeding users...');
  await User.create({
    name: 'HQ Admin',
    email: 'admin@police.lk',
    password: 'Admin@1234',
    role: 'hq_admin',
  });

  await User.create({
    name: 'Western Province Officer',
    email: 'western@police.lk',
    password: 'Officer@1234',
    role: 'provincial_officer',
    province: provinceMap['WP'],
  });

  await User.create({
    name: 'Colombo Station Officer',
    email: 'colombo@police.lk',
    password: 'Station@1234',
    role: 'station_officer',
    province: provinceMap['WP'],
    district: districtMap['COL'],
  });

  // Seed 200 vehicles
 // Seed 200 vehicles
console.log('Seeding 200 vehicles...');
const districtCodes = Object.keys(districtMap);
const vehicles = [];

// Build a districtCode -> provinceId map directly from createdDistricts
const districtProvinceMap = {};
createdDistricts.forEach(d => {
  districtProvinceMap[d.code] = d.province.toString();
});

for (let i = 1; i <= 200; i++) {
  const distCode = districtCodes[i % districtCodes.length];
  const provinceId = districtProvinceMap[distCode];

  vehicles.push({
    registrationNumber: `TUK-${String(i).padStart(4, '0')}`,
    ownerName: `Owner ${i}`,
    ownerNIC: `${900000000 + i}V`,
    ownerContact: `071${String(1000000 + i)}`,
    deviceId: `DEV-${String(i).padStart(4, '0')}`,
    province: new mongoose.Types.ObjectId(provinceId),
    district: districtMap[distCode],
    isActive: true,
    lastLocation: {
      latitude:  districtCoordinates[distCode]?.lat || 7.0,
      longitude: districtCoordinates[distCode]?.lng || 80.0,
      timestamp: new Date(),
    },
  });
}

  const createdVehicles = await Vehicle.insertMany(vehicles);

  // Seed location pings (200 vehicles × 337 pings = ~67,400 records)
  console.log('Seeding location history (this may take a moment)...');
  for (let i = 0; i < createdVehicles.length; i++) {
    const v = createdVehicles[i];
    const distCode = districtCodes[i % districtCodes.length];
    const pings = generatePings(v._id, distCode, v.province, v.district);
    await LocationPing.insertMany(pings);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/200 vehicles pinged`);
  }

  console.log('✅ Seed complete!');
  console.log('─────────────────────────────');
  console.log('Login credentials:');
  console.log('  HQ Admin:          admin@police.lk    / Admin@1234');
  console.log('  Provincial Officer: western@police.lk  / Officer@1234');
  console.log('  Station Officer:   colombo@police.lk  / Station@1234');
  console.log('─────────────────────────────');
  process.exit(0);
};

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});