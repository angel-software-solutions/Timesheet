export class Utils {
  /**
   *
   */
  constructor() {}

  static GetDistinctArray(array, properties: any = []) {
    const distinctArray = [];
    const map = new Map();
    for (const item of array) {
      let concateProperty = "";
      for (const prop of properties) {
        //console.log("CONCATE PROP: ", item[prop], " PROP : ", prop);comment;
        concateProperty = item[prop] + concateProperty;
      }
      // console.log("FINAL CONCATE PROP: ", concateProperty);

      if (!map.has(concateProperty)) {
        map.set(concateProperty, true);
        // console.log(map);
        concateProperty = ""; // set any value to Map
        distinctArray.push(item);
      }
    }

    return distinctArray;
  }

  static ConvertCircularStructureToJson(obj): string {
    var cache = [];
    let jsonString = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // Enable garbage collection
    return jsonString;
  }
}
