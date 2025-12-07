const lines = await Bun.file("input.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const S = grid[0].findIndex((x) => x === "S");

let splitters = 0;

const queue: [y: number, x: number][] = [[0, S]];

const seen = new Set<string>();

while (queue.length > 0) {
  const [y, x] = queue.shift()!;

  if (grid[y]?.[x] === undefined) continue;

  const key = `${y},${x}`;
  if (seen.has(key)) continue;
  seen.add(key);

  if (grid[y][x] === "^") {
    splitters++;
    queue.push([y, x - 1]);
    queue.push([y, x + 1]);
  } else {
    queue.push([y + 1, x]);
  }
}

console.log(splitters);
