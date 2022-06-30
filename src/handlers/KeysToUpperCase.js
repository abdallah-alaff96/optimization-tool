// TO UPPER CASE AND REMOVE THE SPACE
export default function KeysToUpperCase(obj) {
  var keysArr = Object.keys(obj);
  var n = keysArr.length;
  while (n--) {
    var key = keysArr[n]; // "cache" it, for less lookups to the array
    if (key !== key.toUpperCase()) {
      // might already be in its lower case version
      obj[key.toUpperCase()] = obj[key]; // swap the value to a new lower case key
      delete obj[key]; // delete the old key
    }
  }
  return obj;
}
