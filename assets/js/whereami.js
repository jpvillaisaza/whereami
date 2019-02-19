whereAmI = d => {
  const status = document.querySelector("#status");

  const options = {
    enableHighAccuracy: document.querySelector("#enableHighAccuracy").checked,
    maximumAge: 0,
    timeout: Infinity
  }

  success = position => {
    status.textContent = "";
    document.querySelector("#timestamp").textContent = new Date(position.timestamp).toLocaleTimeString();
    document.querySelector("#latitude").textContent = position.coords.latitude;
    document.querySelector("#longitude").textContent = position.coords.longitude;
    document.querySelector("#accuracy").textContent = position.coords.accuracy;
    document.querySelector("#altitude").textContent = position.coords.altitude;
    document.querySelector("#altitudeAccuracy").textContent = position.coords.altitudeAccuracy;
    document.querySelector("#heading").textContent = position.coords.heading;
    document.querySelector("#speed").textContent = position.coords.speed;
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
