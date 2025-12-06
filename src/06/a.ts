const raw = await Bun.file("input.txt").text();

const lines = raw.trim().split("\n");

const digits = lines
  .slice(0, -1)
  .map((x) => x.match(/(\d+)/g)!.map((x) => Number(x)));

const operations = lines[lines.length - 1].match(/[*+]/g)!;

let grandTotal = 0;

for (let i = 0; i < operations.length; i++) {
  const op = operations[i];

  if (op === "*") {
    grandTotal += digits.reduce((product, d) => product * d[i], 1);
  } else if (op === "+") {
    grandTotal += digits.reduce((sum, d) => sum + d[i], 0);
  }
}

console.log(grandTotal);
