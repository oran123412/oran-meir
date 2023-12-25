function generateSudokuGrid() {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  function isValid(num, row, col) {
    // Check if the number is not present in the current row and column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }

    // Check if the number is not present in the current 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(num, row, col)) {
              grid[row][col] = num;
              if (solve()) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false; // Backtrack if no valid number is found
        }
      }
    }
    return true; // Puzzle is solved
  }

  solve();

  // Remove some numbers to create a puzzle
  const emptyCount = 32; // Adjust this value to control the number of empty cells

  for (let i = 0; i < emptyCount; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    grid[row][col] = 0;
  }
   document.styleSheets[0].insertRule("td.empty-cell { color: blue; }", 0);

  return grid;
}

function populateSudokuTable() {
  const table = document.getElementById('sudokuTable');
  const grid = generateSudokuGrid();

  // Append rows to the table
  for (let i = 0; i < 9; i++) {
    const tr = document.createElement('tr');

    // Append cells to each row
    for (let j = 0; j < 9; j++) {
      const td = document.createElement('td');
      if (grid[i][j] !== 0) {
        td.textContent = grid[i][j];
        td.classList.add('editable-cell');
        td.addEventListener('input', function () {
          // Allow only single-digit numbers and clear the cell if the input is invalid
          const inputValue = parseInt(td.textContent);
          if (isNaN(inputValue) || inputValue < 1 || inputValue > 9) {
            td.textContent = '';
          }
        });
      } else {
        td.classList.add('empty-cell');
        td.contentEditable = true;
      }
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
}

// Call the function to populate the table
populateSudokuTable();