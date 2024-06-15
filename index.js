const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

  
fetchCoordsByIP('162.255.115.116', (error, data) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log("It worked! Returned coordinates ", data);
});

const coords =  {latitude: 42.9869502, longitude: -81.243177 };
fetchISSFlyOverTimes(coords, (error, passTimings) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned flyover times:', passTimings);
});