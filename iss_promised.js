const needle = require('needle');

const fetchMyIpPromised = function() {
  return needle('get','https://api.ipify.org?format=json') // referencing original needle behavior with reduced parameters
    .then((response) => {
      const body = response.body; // retrieve the body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    });
};

const fetchCoordsByIpPromised = function(ip) {
  return needle(`http://ipwho.is/${ip}`) // referencing original needle behavior with reduced parameters
    .then((response) => {
      const latitude = response.body.latitude;
      const longitude = response.body.longitude;
      return {latitude, longitude};
    });
};

const fetchISSFlyOverTimesPromised = function(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  return needle(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`) // referencing original needle behavior with reduced parameters
    .then((response) => {
      const body = response.body;
      const passtimes = body.response; // changed the name from response to passtimes for clarification
      return passtimes;
    });
};

// simplifes to a chain of calls instead of creations.
const nextISSTimesForMyLocationPromised = function() {
  return fetchMyIpPromised()
    .then((ip) => fetchCoordsByIpPromised(ip))
    .then((coords) => fetchISSFlyOverTimesPromised(coords))
    .then((passtimes) => {
      return passtimes;
    });
};


module.exports = { nextISSTimesForMyLocationPromised };