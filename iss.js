const needle = require('needle');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      // catching general purpose errors first.
      callback(error, null);
      // the below return seems odd in an  async setting but it is to let the if function as a filter.
      return;
    }

    // important as it can still give the required data
    // with an error code and this verifies data integrity.
    // (This  also happens to future proof code.)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      // the below return seems odd in an  async setting but it is to let the if function as a filter.
      return;
    }

    // do the work if errors don't stop the code.
    const ip = body.ip;
    callback(null, ip); // Pass the IP address to the callback
  });
};

module.exports = { fetchMyIP };
