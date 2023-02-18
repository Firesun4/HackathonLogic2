let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.56066738731618, lng: -104.35459017845358 },
    zoom: 6,
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
  map.overlayMapTypes.insertAt(0, moonMapType)
  map.mapTypes.set("justicemap", moonMapType);
  addAllMarkers();
  //map.setMapTypeId("justicemap");
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