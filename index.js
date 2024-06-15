const { nextISSTimesForMyLocation } = require('./iss');
/*
fetchMyIP((error, IP) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log("It worked! Returned IP ", IP);
});

  
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
*/

const printPassTimes = function(passTimes) {
  // establishes a for of loop as the passTimes will be an array of Objects.
  for (const pass of passTimes) {
    // accesses the Date class.
    const datetime = new Date(0);
    // converts datetime to seconds using UTC format.
    datetime.setUTCSeconds(pass.risetime);
    // using the loop to iterate through the array of objects.
    const duration = pass.duration;
    //logging the dates and times  along with there asosciated durations in human readable text.
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the date and times
  printPassTimes(passTimes);
});