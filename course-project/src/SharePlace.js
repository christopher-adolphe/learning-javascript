import { Modal } from './utility/Modal';
import { Map } from './utility/Map';

class PlaceFinder {
  constructor() {
    const addressFrom = document.querySelector('#place-data form');
    const locateBtn = document.getElementById('locate-btn');

    addressFrom.addEventListener('submit', this.findAddressHandler.bind(this));
    locateBtn.addEventListener('click', this.getLocationHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  findAddressHandler(event) {
    event.preventDefault();
    console.log('findAddress called');
  }

  getLocationHandler() {
    if (!navigator.geolocation) {
      alert('Sorry, your browser does not have geolocation feature. Please use a modern browser or manually enter an address.');
      return;
    }

    const modal = new Modal('loading-modal-content', 'Please wait. Loading locaation...');

    modal.show();

    navigator.geolocation.getCurrentPosition(
      result => {
        console.log('geolocation result: ', result);
        const coordinates = {
          lat: result.coords.latitude,
          lng: result.coords.longitude
        };
        
        this.selectPlace(coordinates);

        modal.hide();
      },
      error => {
        modal.hide();
        alert('Sorry, your could not be found. Please manually enter an address.')
      }
    );
  }
}

const placeFinder = new PlaceFinder();
