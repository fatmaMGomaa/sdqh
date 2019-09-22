var needy = [{ lat: 30.0480, lng: 31.1997 }, { lat: 30.0596, lng: 31.1930 }, { lat: 30.0544, lng: 31.1854 }];
var map, infoWindow;
function initMap() {
    //render the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15
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
    if(needy.length !== 0){
        for(var i = 0; i<needy.length; i++){
            new google.maps.Marker({ position: needy[i], map: map, title: "العنوان: شارع الهرم\nرجل عجوز يحتاج للطعام والعلاج ومأوى\nفاعل الخير: فاطمة" });
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