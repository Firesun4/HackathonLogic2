
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
                //var dataList = [{lat:"40.7128",long:"-74.0060"},{lat:"32",long:"89"}];

                for(var z = 0; z<dataList.length;z++){
                    var x = dataList[z];
                    var lat = parseFloat(x["lat"]);
                    var long = parseFloat(x["long"]);
                    if (lat && long) {
                        var location1 = new google.maps.LatLng(lat, long);
                        placeMarker(location1);
                        console.log("hello")
                        //map.setCenter(location1);
                }
             }


            }
        }

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
