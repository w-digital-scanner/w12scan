'use strict';


function initMap() {
  //Map location
  var MapLocation = {
    lat: 40.6971494,
    lng: -74.2598719
  };

  // Map Zooming
  var MapZoom = 14;


  // Basic Map
  var MapWithMarker = new google.maps.Map(document.getElementById('map-with-marker'), {
    zoom: MapZoom,
    center: MapLocation
  });
  var marker_1 = new google.maps.Marker({
    position: MapLocation,
    map: MapWithMarker
  });

  // Basic map with cutom marker
  var CutomMarker = new google.maps.Map(document.getElementById('cutom-marker'), {
    zoom: MapZoom,
    center: MapLocation
  });
  var iconBase = '../../images/sprites/';
  var marker_2 = new google.maps.Marker({
    position: MapLocation,
    map: CutomMarker,
    icon: iconBase + 'flag.png'
  });

  // Map without controls
  var MinimalMap = new google.maps.Map(document.getElementById('map-minimal'), {
    zoom: MapZoom,
    center: MapLocation,
    disableDefaultUI: true
  });
  var marker_3 = new google.maps.Marker({
    position: MapLocation,
    map: MinimalMap
  });

  // Night Mode
  var NightModeMap = new google.maps.Map(document.getElementById('night-mode-map'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
      "featureType": "all",
      "elementType": "all",
      "stylers": [{
          "saturation": -100
        },
        {
          "gamma": 0.5
        }
      ]
    }]
  });

  // Apple Theme
  var AppletThemeMap = new google.maps.Map(document.getElementById('apple-map-theme'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f7f1df"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#d0e3b4"
        }]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fbd3da"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#bde6ab"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffe15f"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#efd151"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "black"
        }]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#cfb2db"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#a2daf2"
        }]
      }
    ]
  });

  // Nature Theme
  var NatureThemeMap = new google.maps.Map(document.getElementById('nature-map-theme'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
        "featureType": "landscape",
        "stylers": [{
            "hue": "#FFA800"
          },
          {
            "saturation": 0
          },
          {
            "lightness": 0
          },
          {
            "gamma": 1
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [{
            "hue": "#53FF00"
          },
          {
            "saturation": -73
          },
          {
            "lightness": 40
          },
          {
            "gamma": 1
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [{
            "hue": "#FBFF00"
          },
          {
            "saturation": 0
          },
          {
            "lightness": 0
          },
          {
            "gamma": 1
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [{
            "hue": "#00FFFD"
          },
          {
            "saturation": 0
          },
          {
            "lightness": 30
          },
          {
            "gamma": 1
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [{
            "hue": "#00BFFF"
          },
          {
            "saturation": 6
          },
          {
            "lightness": 8
          },
          {
            "gamma": 1
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [{
            "hue": "#679714"
          },
          {
            "saturation": 33.4
          },
          {
            "lightness": -25.4
          },
          {
            "gamma": 1
          }
        ]
      }
    ]
  });

  // Captor Theme
  var CaptorThemeMap = new google.maps.Map(document.getElementById('captor-map-theme'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
        "featureType": "water",
        "stylers": [{
          "color": "#0e171d"
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
          "color": "#1e303d"
        }]
      },
      {
        "featureType": "road",
        "stylers": [{
          "color": "#1e303d"
        }]
      },
      {
        "featureType": "poi.park",
        "stylers": [{
          "color": "#1e303d"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
            "color": "#182731"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "color": "#f0c514"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1e303d"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#e77e24"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#94a5a6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [{
            "visibility": "simplified"
          },
          {
            "color": "#e84c3c"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [{
            "color": "#e84c3c"
          },
          {
            "visibility": "off"
          }
        ]
      }
    ]
  });

  // Avagardo Theme
  var AvagardoThemeMap = new google.maps.Map(document.getElementById('avocado-map-theme'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#aee2e0"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#abce83"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#769E72"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#7B8758"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#EBF4A4"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "simplified"
          },
          {
            "color": "#8dab68"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "simplified"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#5B5B3F"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ABCE83"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#A4C67D"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#9BBF72"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#EBF4A4"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#87ae79"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#7f2200"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "visibility": "on"
          },
          {
            "weight": 4.1
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#495421"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }
    ]
  });

  // Propia Theme
  var PropiaThemeMap = new google.maps.Map(document.getElementById('propia-map-theme'), {
    zoom: MapZoom,
    center: MapLocation,
    styles: [{
        "featureType": "landscape",
        "stylers": [{
            "visibility": "simplified"
          },
          {
            "color": "#2b3f57"
          },
          {
            "weight": 0.1
          }
        ]
      },
      {
        "featureType": "administrative",
        "stylers": [{
            "visibility": "on"
          },
          {
            "hue": "#ff0000"
          },
          {
            "weight": 0.4
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [{
            "weight": 1.3
          },
          {
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f55f77"
          },
          {
            "weight": 3
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f55f77"
          },
          {
            "weight": 1.1
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f55f77"
          },
          {
            "weight": 0.4
          }
        ]
      },
      {},
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
            "weight": 0.8
          },
          {
            "color": "#ffffff"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "weight": 0.7
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "stylers": [{
          "color": "#6c5b7b"
        }]
      },
      {
        "featureType": "water",
        "stylers": [{
          "color": "#f3b191"
        }]
      },
      {
        "featureType": "transit.line",
        "stylers": [{
          "visibility": "on"
        }]
      }
    ]
  });
}