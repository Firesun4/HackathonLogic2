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
  
  getDataField("No2")