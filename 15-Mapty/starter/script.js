'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = Date.now() + ''.slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // array - [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // private fields
  #map;
  #mapEvent;
  // private class field and initialize it to an empty array
  #workouts = [];
  constructor() {
    // constructor loads when the DOM loads
    // Get user's position
    this._getPosition();
    // Attach event handlers
    // need to use bind here since this otherwise points to the form and not the App
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    // containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // Get data from local storage
    // this._getLocalStorage();
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // bind this keyword to the current object
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    // const latitude = postion.coords.latitude;
    // even better, we can destructure and use latitude variable directly
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {}

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // let's create a helper function to check if inputs are a number.
    // It takes an aribtrary number of inputs.
    // Using a rest operator here gives us an array
    // inputs is an array so we loop over the array
    // if all of the inputs are numbers, then it returns true
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    // helper function to check if the inputs are positive
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // + converts the string to a number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng; // destructuring to get lat and lng
    let workout;

    // If workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value; // convert inputCadence to a number
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        // replacing the above with calling the helper function to check if it is a number
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be a positive number');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value; // convert inputElevation to a number
      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to be a positive number');
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Push new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker
    this.renderWorkoutMarker(workout); 

    // Render workout on list

    // Hide form + create input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
  }

  renderWorkoutMarker(workout){
    // Display Marker
    // Destructuring to get lat and lng out of the object
    // const { lat, lng } = this.#mapEvent.latlng;
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();