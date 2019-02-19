whereAmI = d => {
  const status = document.querySelector("#status");

  const options = {
    enableHighAccuracy: document.querySelector("#enableHighAccuracy").checked,
    maximumAge: 0,
    timeout: Infinity
  }

  success = position => {
    status.textContent = "";
    document.querySelector("#timestamp").textContent =
      new Date(position.timestamp).toLocaleTimeString();
    document.querySelector("#latitude").textContent =
      position.coords.latitude + "º";
    document.querySelector("#longitude").textContent =
      position.coords.longitude + "º";
    document.querySelector("#accuracy").textContent =
      position.coords.accuracy + " m";
    document.querySelector("#altitude").textContent =
      position.coords.altitude ? position.coords.altitude + " m" : null;
    document.querySelector("#altitudeAccuracy").textContent =
      position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy + " m" : null;
    document.querySelector("#heading").textContent =
      position.coords.heading !== null ? (isNaN(position.coords.heading) ? null : position.coords.heading + "º") : null;
    document.querySelector("#speed").textContent =
      position.coords.speed ? position.coords.speed +  " m/s" : null;
  }

  error = error => {
    switch (error.code) {
      case PERMISSION_DENIED:
        status.textContent = error.message;
        break;
      case POSITION_UNAVAILABLE:
        status.textContent = error.message;
        break;
      case TIMEOUT:
        status.textContent = error.message;
        break;
      default:
        status.textContent = error.message;
    }
  }

  if (!navigator.geolocation) {
    status.textContent = "...";
  } else {
    status.textContent = "Locating...";
    navigator.geolocation.getCurrentPosition(success, error, options)
  }
}

document.getElementById("form").addEventListener("submit", event => {
  event.preventDefault();
  whereAmI();
});
