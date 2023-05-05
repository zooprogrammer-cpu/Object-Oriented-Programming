'use strict';

// prettier-ignore

class Workout {
  date = new Date();
  id = Date.now() + ''.slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // array - [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    //prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription(); 

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
    this._setDescription(); // calling a function in the parent class works through the scope-chain
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

  _hideForm() { 
    // Empty the inputs first
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    // Hide the form immediately
    form.style.display = 'none';
    form.classList.add('hidden');

    setTimeout(() => form.style.display = 'grid', 1000); 

    
  }

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
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + create input fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
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
      .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value"${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running'){
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
        form.insertAdjacentHTML('afterend', html);

    }

    if (workout.type === 'cycling'){
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
      form.insertAdjacentHTML('afterend', html);
    }
  }
}

const app = new App();