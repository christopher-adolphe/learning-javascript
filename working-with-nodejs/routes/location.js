const express = require('express');

// Importing mongodb module
const mongodb = require('mongodb');

// Importing MongoClient module
const MongoClient = mongodb.MongoClient;

// Creating an Express Router which will be used to register different routes
const router = express.Router();

// Creating a temporary storage for the locations
const locationStorage = {
  locations: []
};

const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

// Creating a new mongo client
const client = new MongoClient(uri);

// Registering a POST request on '/add-location' path
router.post('/add-location', async (request, response, next) => {
  // const id = Math.random();
  const { address, lat, lng } = request.body;

  // locationStorage.locations.push({
  //   id,
  //   address,
  //   coordinates: { lat, lng }
  // });

  // console.log('locationStorage: ', locationStorage);
  try {
    // Connecting the client to the server
    await client.connect();

    // Creating a new Db instance to the database we want
    const db = await client.db('share-place');

    // Inserting the document (i.e the new record) in the locations table
    const result = await db.collection('locations').insertOne({ address, coordinates: { lat, lng }});

    console.log('add location result: ', result);

    response.json({ message: 'Location successfully saved!', locationId: result.insertedId });
  } catch (error) {
    console.log(error.message);
  } finally {
    // Ensuring that the client will close after we are done or in case of failure
    await client.close();
  }
});

router.get('/location/:locationId', async (request, response, next) => {
  let locationId = request.params.locationId;

  if (!locationId) {
    return response.status(404).json({ message: 'Sorry, location id not provided!' });
  }

  // const location = locationStorage.locations.find(location => location.id === locationId);

  try {
    locationId = new mongodb.ObjectId(locationId);
  } catch (error) {
    return response.status(500).json({ message: 'Sorry, location id provided is invalid!' });
  }
  console.log('locationId: ', locationId);

  try {
    await client.connect();

    const db = await client.db('share-place');

    const result = await db.collection('locations').findOne({ _id: locationId });

    console.log('retrieved location result: ', result);

    if (!result) {
      return response.status(404).json({ message: 'Sorry, location not found!' });
    }

    const { address, coordinates } = result;

    response.json({ address, coordinates });
  } catch (error) {
    console.log(error.message);
  } finally {
    await client.close();
  }
});

router.get('/', (request, response, next) => {
  response.json({ message: 'Hello from Express' });
});

module.exports = router;
