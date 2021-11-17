import { Map } from './utility/Map';

class SharedPlace {
  constructor(address, coordinates) {
    const headerTitleElem = document.querySelector('header h1');

    headerTitleElem.textContent = address;
    new Map(coordinates);
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
// const address = queryParams.get('address');
// const coordinates = {
//   lat: parseFloat(queryParams.get('lat')),
//   lng: +queryParams.get('lng')
// };
const locationId = queryParams.get('location');

fetch(`http://localhost:3000/location/${locationId}`)
  .then(response => {
    if (response.status === 404) {
      throw new Error('Could not find location');
    }

    return response.json()
  })
  .then(data => new SharedPlace(data.address, data.coordinates))
  .catch(error => alert(error.message));
