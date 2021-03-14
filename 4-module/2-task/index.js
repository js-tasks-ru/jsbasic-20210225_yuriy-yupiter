function makeDiagonalRed(table) {
  [...table.rows].forEach( (row, i) => {
      row.cells[i].style.backgroundColor = 'red';
  });
}
