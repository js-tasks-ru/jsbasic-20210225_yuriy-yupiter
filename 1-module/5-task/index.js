function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = str.slice(0, 19) + "…";
    return str;
  } else {
    return str;
  }
}
