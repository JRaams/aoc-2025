const lines = await Bun.file("input.txt").text();

const tiles = lines
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

function rect(array: number[][], i: number, j: number) {
  let [minX, minY] = array[i];
  let [maxX, maxY] = array[j];

  if (minX > maxX) [minX, maxX] = [maxX, minX];
  if (minY > maxY) [minY, maxY] = [maxY, minY];

  return [minX, minY, maxX, maxY];
}

let largestArea = 0;

for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    const [minX, minY, maxX, maxY] = rect(tiles, i, j);

    const area = (maxX - minX + 1) * (maxY - minY + 1);

    if (largestArea < area) {
      largestArea = area;
    }
  }
}

console.log(largestArea);
