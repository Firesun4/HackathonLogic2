 let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.267230, lng: -97.751978 },
    zoom: 10,
  });




const moonMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const normalizedCoord = getNormalizedCoord(coord, zoom);

      if (!normalizedCoord) {
        return "";
      }

      return (
        "http://www.justicemap.org/tile/block/plural" +
        "/" +
        zoom +
        "/" +
        normalizedCoord.x +
        "/" +
        normalizedCoord.y +
        ".png"
      );
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 9,
    minZoom: 0,
    // @ts-ignore TODO 'radius' does not exist in type 'ImageMapTypeOptions'
    radius: 1738000,
    name: "JusticeMap",
  });

  map.mapTypes.set("justicemap", moonMapType);
  map.setMapTypeId("justicemap");
  addAllMarkers();
}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  const y = coord.y;
  let x = coord.x;
  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  const tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = ((x % tileRange) + tileRange) % tileRange;
  }
  return { x: x, y: y };
}

window.initMap = initMap;

//window.initMap = initMap;
// [END maps_map_simple]


     function placeMarker(location) {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                animation: google.maps.Animation.DROP,
            });
            marker.setMap(map);
    }
        function addAllMarkers() {
            var fieldList = ["ozone", "pm10", "pm25", "No2"]
            for(const i in fieldList){
                var dataList = getDataField(i);


                for(const x in dataList){
                    var lat = parseFloat(x["lat"]);
                    var long = parseFloat(["long"]);
                    if (lat && long) {
                        var location1 = new google.maps.LatLng(lat, long);
                        placeMarker(location1);
                        //map.setCenter(location1);
                }
             }


            }
        }
/*
window.onload = function () {
    var lat = document.getElementById('latitude').value;
    var long = document.getElementById('longitude').value;
    if (lat && long) {
        var location1 = new google.maps.LatLng(lat, long);
        initialize(location1);
        flag = 1;
    } else {
        initialize(new google.maps.LatLng(-33.8688, 151.2093)); // default location
    }
};
*/

async function getAllData() {
  const response = await fetch('http://localhost:8000/get/all-aqi')
  const the_response = await(response.json())
    return the_response;
}


async function getDataField(field) {
  response = await(getAllData())
  console.log(field)
  var listOfDicts = []
  for(let i = 0; i < response.length - 1; i++){
    var dict = {
      lat: response[i].latitude,
      long: response[i].longitude,
    }
    dict[field] = response[i][field]
    listOfDicts.push(dict)
  }
  console.log(listOfDicts)
  return dict
}
//k




