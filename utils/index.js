/**
 * @desc Updates an array of object values if the new value is not null
 *
 * @param {{}} obj
 * @param {{key: string, value: any}[]} keys
 */
exports.updateIfNotEmpty = (obj, keys) => {
  keys.forEach(curr => {
    if (curr.value) obj[curr.key] = curr.value;
  });
};
