const { nextISSTimesForMyLocationPromised } = require("./iss_promised");

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

nextISSTimesForMyLocationPromised()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });