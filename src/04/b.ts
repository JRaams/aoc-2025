const lines = await Bun.file("input.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let accessable = 0;

while (true) {
  const toRemove: [number, number][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== "@") continue;

      let neighbours = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue;

          if (grid[y + dy]?.[x + dx] === "@") {
            neighbours++;
          }
        }
      }

      if (neighbours < 4) {
        accessable++;
        toRemove.push([y, x]);
      }
    }
  }

  if (toRemove.length === 0) {
    break;
  }

  for (const [y, x] of toRemove) {
    grid[y][x] = ".";
  }
}

console.log(accessable);
