function getMinMax(str) {
  const outOfSpaces = str.split(' ').join();
  const arrayItem = outOfSpaces.split(',');
  const allNumbers = arrayItem
    .filter((item) => item !== '' && isFinite(item));

  const max = Math.max(...allNumbers);
  const min = Math.min(...allNumbers);

  return {min, max};
}
