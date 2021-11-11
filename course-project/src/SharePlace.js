import { Modal } from './utility/Modal';
import { Map } from './utility/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './utility/Location';

class PlaceFinder {
  constructor() {
    const addressFrom = document.querySelector('#place-data form');
    const locateBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    addressFrom.addEventListener('submit', this.findAddressHandler.bind(this));
    locateBtn.addEventListener('click', this.getLocationHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    const { lat, lng } = coordinates;
    const shareLinkInputElem = document.getElementById('share-link');

    this.shareBtn.disabled = false;
    shareLinkInputElem.value = `${location.origin}/my-place?address=${address}&lat=${lat}&lng=${lng}`;
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      alert('Sorry, the address is invalid. Please try again.');
      return;
    }

    const modal = new Modal('loading-modal-content', 'Please wait. Loading locaation...');

    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);

      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }

  getLocationHandler() {
    if (!navigator.geolocation) {
      alert('Sorry, your browser does not have geolocation feature. Please use a modern browser or manually enter an address.');
      return;
    }

    const modal = new Modal('loading-modal-content', 'Please wait. Loading locaation...');

    modal.show();

    navigator.geolocation.getCurrentPosition(
      async result => {
        console.log('geolocation result: ', result);
        const coordinates = {
          lat: result.coords.latitude,
          lng: result.coords.longitude
        };

        try {
          const address = await getAddressFromCoords(coordinates);

          this.selectPlace(coordinates, address);
        } catch (error) {
          alert(error.message);
        }

        modal.hide();
      },
      error => {
        modal.hide();
        alert('Sorry, your could not be found. Please manually enter an address.')
      }
    );
  }

  sharePlaceHandler() {
    console.log('sharePlaceHandler called');
  }
}

const placeFinder = new PlaceFinder();
