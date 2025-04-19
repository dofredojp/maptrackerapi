# Map Location API

REST API for storing and retrieving Google Maps location links.

## Features
- Store Google Maps location links
- Retrieve stored locations with pagination
- Secure endpoints with rate limiting and security headers
- Health check endpoint

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/locations` - Get all locations (with pagination)
  - Query params: 
    - `page` (default: 1)
    - `limit` (default: 10, max: 50)
- `POST /api/locations` - Store a new location
  ```json
  {
    "googleMapsLink": "https://www.google.com/maps?q=37.7749,-122.4194"
  }
  ```

## Environment Variables

Required environment variables in production:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
PORT=3000 (optional, defaults to 3000)
```

## Deployment to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `NODE_ENV`: production
     - `MONGODB_URI`: your_mongodb_connection_string
   - Auto-Deploy: Yes

## Local Development

1. Clone the repository
2. Create `.env` file with required variables
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

## Security Features
- Helmet.js for security headers
- Rate limiting
- Request size limiting
- CORS enabled
- Input validation
- Environment-based error responses