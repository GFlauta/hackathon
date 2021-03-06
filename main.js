//set default to Denver
var myLatLng = {
  lat: 39.7558146,
  lng: -105.0426646
};
//control bottom ticker
ScrollSpeed = 200;
   ScrollChars = 1
   ScrollValue = ''
   function ScrollMarquee() {
   window.setTimeout('ScrollMarquee()',ScrollSpeed);

   var msg = document.ticker.text.value;
   document.ticker.text.value =
   msg.substring(ScrollChars) +
   msg.substring(0,ScrollChars);
   }
   ScrollMarquee()

//set up clickable map zoomed in on Dever
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControl: true
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });

  map.addListener('click', function(event) {
    myLatLng = {
      lat: Math.round(event.latLng.lat()),
      lng: Math.round(event.latLng.lng())
    };
    // console.log(marker.position);
    checkWind(Math.round(event.latLng.lat()),

    Math.round(event.latLng.lng()));
    console.log(checkWind)
    initMap();
    });
}
//determine kite position based on mph of wind
function setKiteHeight(speed) {
  var balloon = document.querySelector('.balloon')
  if (speed < 5) {
    balloon.classList = ""
    balloon.classList.add('balloon')
    balloon.classList.add('noWind')
  }
  else if (speed >= 5 && speed < 10) {
    balloon.classList = ""
    balloon.classList.add('reallyLowWind')
    balloon.classList.add('wiggleVertical')
    balloon.classList.add('wiggleHorizontal')
    balloon.classList.add('balloon')
  }
  else if (speed >= 10 && speed < 15) {
    balloon.classList = ""
    balloon.classList.add('lowWind')
    balloon.classList.add('wiggleVertical')
    balloon.classList.add('wiggleHorizontal')
    balloon.classList.add('balloon')
  }
  else if (speed >= 15 && speed < 20) {
    balloon.classList = ""
    balloon.classList.add('medWind')
    balloon.classList.add('wiggleVertical')
    balloon.classList.add('wiggleHorizontal')
    balloon.classList.add('balloon')
  }
  else if (speed >= 20 && speed < 25) {
    balloon.classList = ""
    balloon.classList.add('highWind')
    balloon.classList.add('wiggleVertical')
    balloon.classList.add('wiggleHorizontal')
    balloon.classList.add('balloon')
  }
  else if (speed >= 25) {
    balloon.classList = ""
    balloon.classList.add('reallyHighWind')
    balloon.classList.add('balloon')
  }
}
//get data from api on weather
function checkWind(lat, lng) {
  var url = "https://api.wunderground.com/api/68e3e7c9b741eaf5/geolookup/conditions/q/" + lat + ',' + lng + '.json';



  $.get(url).then(function(data) {
// console.log(data);
  // console.log(data.current_observation.wind_mph);
  // console.log(data.current_observation.wind_dir);
  // console.log(data.location.city);
  // console.log(data.location.state);
  // console.log(data.location.country);
  // console.log(data.current_observation.local_time_rfc822);
  ScrollValue = ""
  ScrollValue += "     City: " + data.location.city.toString();
  ScrollValue += ", " + data.location.state.toString();
  ScrollValue += "     Wind: " + data.current_observation.wind_string.toString();
  ScrollValue += "     " + data.current_observation.observation_time.toString();
  ScrollValue += "     Weather: " + data.current_observation.weather.toString();
  ScrollValue += "     Temperature: " + data.current_observation.temperature_string.toString();
  $('INPUT').val(ScrollValue)

  $('#location').text(data.location.city + ", " + data.location.state)
  // $('#localTime').text('Local Time: ' + data.current_observation.local_time_rfc822)
  $('#windSpeed').text('Wind Speed: ' + data.current_observation.wind_mph + " MPH")
  $('#windDirection').text('Wind Direction: ' + data.current_observation.wind_dir)

  setKiteHeight(data.current_observation.wind_mph)
  });
}
