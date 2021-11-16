const express = require('express');
// Creating an Express Router which will be used to register different routes
const router = express.Router();
// Creating a temporary storage for the locations
const locationStorage = {
  locations: []
};

// Registering a POST request on '/add-location' path
router.post('/add-location', async (request, response, next) => {
  const id = Math.random();
  const { address, lat, lng } = request.body;

  locationStorage.locations.push({
    id,
    address,
    coordinates: { lat, lng }
  });

  console.log('locationStorage: ', locationStorage);

  response.json({ message: 'Location successfully saved!', locationId: id });
});

router.get('/location/:locationId', (request, response, next) => {
  const locationId = +request.params.locationId;
  const location = locationStorage.locations.find(location => location.id === locationId);

  if (!location) {
    return response.status(404).json({ message: 'Sorry, location not found!' });
  }

  const { address, coordinates } = location;

  response.json({ address, coordinates });
});

router.get('/', (request, response, next) => {
  response.json({ message: 'Hello from Express' });
});

module.exports = router;
