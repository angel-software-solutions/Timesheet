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
        //console.log("CONCATE PROP: ", item[prop], " PROP : ", prop);
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
}
