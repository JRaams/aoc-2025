const raw = await Bun.file("input.txt").text();

const lines = raw.trim().split("\n");

const operations = lines[lines.length - 1].match(/[*+]/g)!;

// 1. Define problems by reversing through the input columns right-to-left
const problems: number[][] = [];
let numbers: number[] = [];

for (let x = lines[0].length - 1; x >= 0; x--) {
  let str = "";
  for (let y = 0; y < lines.length - 1; y++) {
    str += lines[y][x];
  }
  str = str.trim();

  if (str.length === 0) {
    problems.unshift(numbers);
    numbers = [];
  } else {
    numbers.push(Number(str));
  }
}

problems.unshift(numbers);

// 2. Execute the operations as before
let grandTotal = 0;

for (let i = 0; i < operations.length; i++) {
  const op = operations[i];

  if (op === "*") {
    grandTotal += problems[i].reduce((a, b) => a * b, 1);
  } else if (op === "+") {
    grandTotal += problems[i].reduce((a, b) => a + b, 0);
  }
}

console.log(grandTotal);
