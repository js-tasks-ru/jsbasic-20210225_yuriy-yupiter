function getMinMax(str) {
  let outOfSpaces = str.split(' ').join();
  let arrayItem = outOfSpaces.split(',');
  let allNumbers = arrayItem
    .filter((item) => item !== '' && isFinite(item));

  let max = Math.max(...allNumbers);
  let min = Math.min(...allNumbers);

  return {min, max};
}
