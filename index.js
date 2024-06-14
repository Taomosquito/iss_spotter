const { fetchCoordsByIP } = require('./iss');

  
fetchCoordsByIP('162.255.115.116', (error, data) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log("It worked! Returned coordinates ", data);
});