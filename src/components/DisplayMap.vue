<template>
  <div id="map">
  </div>

  <div class="header">
    <img src="../assets/LOGO_BLASON_FEDE_CHESSBOXING_BLANC.png"/>
    <h1>TROUVE TON CLUB!</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import json from '../assets/mock.json';

export default {
  name: 'DisplayMap',

  setup() {
    const initMap = async () => {

      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 46.2276, lng: 2.2137 },
        zoomControl: false,
        gestureHandling: "none",
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ]
      });

      const cities = await getCities();

      cities.forEach(city => {
        console.log(city.lat)
        const marker = new window.google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
     /*     icon: '../assets/sm_gant.png',*/
          map,
        });

        const content = `
        <div class="modal">
        <img src="../assets/echecs_mat.png"/>
        <div class="info">
          <h3>${ city.name }</h3>
          <p>  <img class="icon" src="../assets/map.png"/><span>${ city.address }</span></p>
          <a href="tel:${ city.phone }">  <img class="icon" src="../assets/phone.png"/> <span>${ city.phone }</span></a>

          <a target="_blank" href="${ city.website }"> <img class="icon" src="../assets/web.png"/> <span>Site Web</span></a>
          </div>
          </div>
        `;

        const infowindow = new window.google.maps.InfoWindow({
          content,
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    };

    const getCities = async () => {
      return json;
    };

    onMounted(() => {
      // Load the Google Maps API script
      const script = document.createElement('script');

      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpPZ5VaccQKQRM0WqSd6CRfKa8BrGq6ns&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    });

    return {
      initMap,
    };
  },
};
</script>
<style scss>
#map {
  width: 100%;
  height: 100vh;
  position: initial !important;
  text-transform: uppercase;
}


img {
  width: 10px;
}


.header {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  align-items: center;
  left: 25%;
  width: 50%;
}

h1 {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-style: italic;
  color: white;
  font-size: 45px;
  transform: rotate(-8deg);

}

img {
  width: 150px;
}

a {
  color: white;
  font-family: "Lato", sans-serif;margin-bottom: 10px;
}

a:hover {
  color: white;
}

.modal {
  font-family: "Lato", sans-serif;
  color: white;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 428px;
  height: 120px;
  flex-direction: row;
}

span{
  margin-left:5px;
}

p, a{
  display: flex;
}

.icon {
  width: 15px;
}


h3 {
  margin-top: 0;
  font-size: 22px;
  font-style: italic;
}

.gmnoprint, .gm-control-active {
  display: none;
}

.gm-style-iw-d {
  background: none !important;
  overflow: initial !important;
}

.gm-style .gm-style-iw-c {
  border-radius: 3px !important;
  padding: 30px !important;
  top: 300px;
  background: rgb(178, 36, 67);
  background: linear-gradient(90deg, rgba(178, 36, 67, 1) 0%, rgba(20, 66, 104, 1) 100%, rgba(0, 212, 255, 1) 100%);
}

.gm-style-iw-tc::after {
  display: none;
}
</style>
