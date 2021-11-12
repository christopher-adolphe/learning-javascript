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
const address = queryParams.get('address');
const coordinates = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng')
};

new SharedPlace(address, coordinates);
