function makeDiagonalRed(table) {
  [...table.rows].forEach( (row, i) => {
    console.log(row);
    row.cells[i].style.backgroundColor = 'red';
  });
}
