import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tuk-Tuk Tracker API',
      version: '1.0.0',
      description: 'Real-Time Three-Wheeler Tracking & Movement Logging System for Sri Lanka Police',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth',      description: 'Authentication endpoints' },
      { name: 'Provinces', description: 'Province management' },
      { name: 'Districts', description: 'District management' },
      { name: 'Stations',  description: 'Police station management' },
      { name: 'Vehicles',  description: 'Tuk-tuk vehicle management' },
      { name: 'Locations', description: 'Location tracking endpoints' },
    ],
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'role'],
                  properties: {
                    name:     { type: 'string',  example: 'John Silva' },
                    email:    { type: 'string',  example: 'john@police.lk' },
                    password: { type: 'string',  example: 'Pass@1234' },
                    role:     { type: 'string',  example: 'station_officer',
                      enum: ['hq_admin','provincial_officer','station_officer','device'] },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'User already exists' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login and get JWT token',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email:    { type: 'string', example: 'admin@police.lk' },
                    password: { type: 'string', example: 'Admin@1234' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful, returns JWT token' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/api/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current logged in user',
          responses: {
            200: { description: 'Current user data' },
            401: { description: 'Not authorized' },
          },
        },
      },
      '/api/provinces': {
        get: {
          tags: ['Provinces'],
          summary: 'Get all provinces',
          responses: { 200: { description: 'List of all provinces' } },
        },
        post: {
          tags: ['Provinces'],
          summary: 'Create a province (HQ Admin only)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Western' },
                    code: { type: 'string', example: 'WP' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Province created' } },
        },
      },
      '/api/districts': {
        get: {
          tags: ['Districts'],
          summary: 'Get all districts, optionally filter by province',
          parameters: [
            {
              name: 'province',
              in: 'query',
              schema: { type: 'string' },
              description: 'Province ID to filter by',
            },
          ],
          responses: { 200: { description: 'List of districts' } },
        },
      },
      '/api/stations': {
        get: {
          tags: ['Stations'],
          summary: 'Get all police stations',
          parameters: [
            { name: 'province', in: 'query', schema: { type: 'string' } },
            { name: 'district', in: 'query', schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'List of police stations' } },
        },
        post: {
          tags: ['Stations'],
          summary: 'Create a police station (HQ Admin only)',
          responses: { 201: { description: 'Station created' } },
        },
      },
      '/api/stations/{id}': {
        get: {
          tags: ['Stations'],
          summary: 'Get single station',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Station data' } },
        },
        put: {
          tags: ['Stations'],
          summary: 'Update a station (HQ Admin only)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Station updated' } },
        },
        delete: {
          tags: ['Stations'],
          summary: 'Delete a station (HQ Admin only)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Station deleted' } },
        },
      },
      '/api/vehicles': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get all vehicles with optional filters',
          parameters: [
            { name: 'province', in: 'query', schema: { type: 'string' } },
            { name: 'district', in: 'query', schema: { type: 'string' } },
            { name: 'isActive', in: 'query', schema: { type: 'boolean' } },
          ],
          responses: { 200: { description: 'List of vehicles' } },
        },
        post: {
          tags: ['Vehicles'],
          summary: 'Register a new tuk-tuk',
          responses: { 201: { description: 'Vehicle registered' } },
        },
      },
      '/api/vehicles/{id}': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get single vehicle',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Vehicle data' } },
        },
        put: {
          tags: ['Vehicles'],
          summary: 'Update vehicle',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Vehicle updated' } },
        },
        delete: {
          tags: ['Vehicles'],
          summary: 'Delete vehicle (HQ Admin only)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Vehicle deleted' } },
        },
      },
      '/api/locations/ping': {
        post: {
          tags: ['Locations'],
          summary: 'Post a GPS location ping from a device',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['vehicleId', 'latitude', 'longitude'],
                  properties: {
                    vehicleId:  { type: 'string',  example: '64abc123...' },
                    latitude:   { type: 'number',  example: 6.9271 },
                    longitude:  { type: 'number',  example: 79.8612 },
                    speed:      { type: 'number',  example: 40 },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Ping recorded' } },
        },
      },
      '/api/locations/active': {
        get: {
          tags: ['Locations'],
          summary: 'Get all active vehicles with last known location',
          parameters: [
            { name: 'province', in: 'query', schema: { type: 'string' } },
            { name: 'district', in: 'query', schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'Active vehicles with locations' } },
        },
      },
      '/api/locations/{vehicleId}/last': {
        get: {
          tags: ['Locations'],
          summary: 'Get last known location of a vehicle',
          parameters: [{ name: 'vehicleId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Last location data' } },
        },
      },
      '/api/locations/{vehicleId}/history': {
        get: {
          tags: ['Locations'],
          summary: 'Get location history of a vehicle',
          parameters: [
            { name: 'vehicleId', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'from', in: 'query', schema: { type: 'string' }, description: 'Start date e.g. 2024-01-01' },
            { name: 'to',   in: 'query', schema: { type: 'string' }, description: 'End date e.g. 2024-01-07' },
          ],
          responses: { 200: { description: 'Location history array' } },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);