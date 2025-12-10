const lines = await Bun.file("input.txt").text();

const tiles = lines
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

let largestArea = 0;

for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    let [minX, minY] = tiles[i];
    let [maxX, maxY] = tiles[j];

    if (minX > maxX) [minX, maxX] = [maxX, minX];
    if (minY > maxY) [minY, maxY] = [maxY, minY];

    const area = (maxX - minX + 1) * (maxY - minY + 1);

    if (largestArea < area) {
      largestArea = area;
    }
  }
}

console.log(largestArea);
