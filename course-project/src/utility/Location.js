const API_KEY = 'YOUR_API_KEY';

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Sorry, an error occured while fetching coordinates. Please try again');
    }

    const data = await response.json();
    console.log('getCoordsFromAddress: ', data);

    if (data.error_message) {
      throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
  } catch (error) {
    throw new Error('Sorry, an error occured while fetching coordinates.');
  }
}

export async function getAddressFromCoords(coordinates) {
  const { lat, lng } = coordinates;

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Sorry, an error occured while fetching address. Please try again');
    }

    const data = await response.json();
    console.log('getAddressFromCoords: ', data);

    if (data.error_message) {
      throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;

    return address;
  } catch (error) {
    throw new Error('Sorry, an error occured while fetching address.');
  }
}
