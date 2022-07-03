// TO LOWER CASE AND REMOVE THE SPACE
export function KeysToLowerCase(obj) {
  var myKeys = Object.keys(obj);
  var n = myKeys.length;
  while (n--) {
    var key = myKeys[n]; // "cache" it, for less lookups to the array
    if (key !== key.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_")) {
      // might already be in its lower case version
      obj[
        key
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9]/g, "_")
      ] = obj[key]; // swap the value to a new lower case key
      delete obj[key]; // delete the old key
    }
  }
  return obj;
}
