<template>
<parallax>
  <gmap-map id="map" :center="center" v-bind:options="mapStyle" :zoom="14"></gmap-map>
</parallax>
</template>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCud6XhIFTYUp4E-BhQGF59oJWGkI_jZLo'
  }
})
export default {
  data() {
    return {
      center: {
        lat: 50.1109221,
        lng: 8.6821267
      },
      mapStyle: {
        backgroundColor: 'none',
        disableDefaultUI: 'true',
        styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 40
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
              },
              {
                "lightness": 17
              },
              {
                "weight": 1.2
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "administrative.country",
            "elementType": "all",
            "stylers": [{
              "visibility": "simplified"
            }]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [{
              "visibility": "simplified"
            }]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [{
              "visibility": "simplified"
            }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
              },
              {
                "saturation": "-100"
              },
              {
                "lightness": "30"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
              },
              {
                "gamma": "0.00"
              },
              {
                "lightness": "74"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#34334f"
              },
              {
                "lightness": "-37"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
              "lightness": "3"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
              },
              {
                "lightness": 21
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
              "visibility": "simplified"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#2d2c45"
              },
              {
                "lightness": "0"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
              },
              {
                "lightness": 29
              },
              {
                "weight": 0.2
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#7d7c9b"
              },
              {
                "lightness": "43"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2d2c45"
              },
              {
                "lightness": "1"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{
              "visibility": "on"
            }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#7d7c9b"
            }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2d2c45"
              },
              {
                "lightness": "-1"
              },
              {
                "gamma": "1"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
              },
              {
                "hue": "#ff0000"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#7d7c9b"
              },
              {
                "lightness": "-31"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2d2c45"
              },
              {
                "lightness": "-36"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2d2c45"
              },
              {
                "lightness": "0"
              },
              {
                "gamma": "1"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          }
        ]
      },
    }
  }
}
</script>
