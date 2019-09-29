const token = getLocalStorageItem("token");
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
let cases = [];
var map, infoWindow;

axios
    .get("http://localhost:8080/allCases?caseType=animal", {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        cases = response.data.cases;
        console.log(cases);
        mapWithMarkers();
    })
    .catch(error => {
        console.log(error);
    });
const mapWithMarkers = function initMap() {
    //render the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            saveToLocalStorage("location", pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('موقعك الحالي');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    //add a marker
    if (cases.length !== 0) {
        let currentLocation, content, marker, caseId;
        for (var i = 0; i < cases.length; i++) {
            currentLocation = { lat: +cases[i]["lat"], lng: +cases[i]["lng"] };
            content = `${cases[i]["species"].substring(0, 100)}\n${cases[i]["description"].substring(0, 100)}...\n${cases[i]["address"].substring(0, 100)}\n`
            marker = new google.maps.Marker({ position: currentLocation, map: map, title: content });
            marker.set("id", +cases[i]["id"]);
            marker.addListener('click', function () {
                caseId = this.get("id");
                saveToLocalStorage("caseId", caseId)
                saveToLocalStorage("caseType", "animal")
                window.location.replace(baseURL + `/cases/animal/singleCase/singleCase.html`);
            }); 
        }
    }
    
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}