const needle = require('needle');

const nextISSTimesForMyLocation = function(callback) {
  // format requires the understanding your borrowing the logic that was originally calling each from index.js
  // (template logic is commented out)
  fetchMyIP((error, IP) => {
    if (error) {
      console.log("It didn't work! ", error);
      return callback(error, null);
    }
    fetchCoordsByIP(IP,(error, coords) => {
      if (error) {
        console.log("It didn't work! ", error);
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, nextPassList) => {
        if (error) {
          console.log("It didn't work! ", error);
          return callback(error, null);
        }
        callback(null, nextPassList);
      });
    });
  });
};

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // important as it can still give the required data
    // with an error code and this verifies data integrity.
    // (This  also happens to future proof code.)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // do the work if errors don't stop the code.
    const ip = body.ip;
    callback(null, ip); // Pass the IP address to the callback
  });
};


const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // does innate behavior but makes code more readable.
    if (response.statusCode === 200) {
      body.success = true;
    }

    // replaces the need to use resonse === 200 indicating success used for data integrity.
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }
    //creating easy object access terminology
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const longitude = coords.longitude;
  const latitude = coords.latitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // important as it can still give the required data
    // with an error code and this verifies data integrity.
    // (This  also happens to future proof code.)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching data: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = body.response;
    callback(null, passes);
  });
};

// Don't need to export the other function since we are not testing it right now.
module.exports = { fetchCoordsByIP, fetchMyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

