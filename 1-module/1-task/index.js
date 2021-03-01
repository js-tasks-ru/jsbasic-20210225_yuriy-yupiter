function factorial(n) {
  let factorialValue = 1;

  if (n <= 1) {
    return factorialValue;
  }
  while (n > 1) {
    factorialValue *= n;
    n -= 1;
  }
  return factorialValue;

}
