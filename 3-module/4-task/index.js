function showSalary(users, age) {
  return users
    .filter(({age: ageObj}) => ageObj <= age)
    .map( ({name, balance}) => `${name}, ${balance}` )
    .join("\n");
}
