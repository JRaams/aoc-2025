const lines = await Bun.file("input.txt").text();

const tiles = lines
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number) as [number, number]);

function rect(array: number[][], i: number, j: number) {
  let [minX, minY] = array[i];
  let [maxX, maxY] = array[j];

  if (minX > maxX) [minX, maxX] = [maxX, minX];
  if (minY > maxY) [minY, maxY] = [maxY, minY];

  return [minX, minY, maxX, maxY];
}

function shrinkGrid(tiles: [number, number][]) {
  // 1. Find unique x and y values
  const uniquey = new Set<number>([0, Infinity]);
  const uniquex = new Set<number>([0, Infinity]);

  for (const [x, y] of tiles) {
    uniquey.add(y);
    uniquex.add(x);
  }

  const ys = Array.from(uniquey).sort((a, b) => a - b);
  const xs = Array.from(uniquex).sort((a, b) => a - b);

  // 2. Map x and y values to indices
  const yMap = new Map<number, number>();
  const xMap = new Map<number, number>();

  for (let i = 0; i < ys.length; i++) {
    yMap.set(ys[i], i);
  }

  for (let i = 0; i < xs.length; i++) {
    xMap.set(xs[i], i);
  }

  // 3. Shrink tiles and grid to indices
  const shrunkTiles = tiles.map(([x, y]) => [xMap.get(x)!, yMap.get(y)!]);

  const shrunkGrid = Array.from({ length: xs.length }, () =>
    Array<"todo" | "inside" | "outside">(ys.length).fill("todo")
  );

  // 4. Mark rectangles as inside
  for (let i = 0; i < tiles.length; i++) {
    const [sx1, sy1, sx2, sy2] = rect(shrunkTiles, i, (i + 1) % tiles.length);

    for (let x = sx1; x <= sx2; x++) {
      for (let y = sy1; y <= sy2; y++) {
        shrunkGrid[y][x] = "inside";
      }
    }
  }

  // 5. Flood fill to mark outside tiles
  const queue: [number, number][] = [[0, 0]];

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    if (shrunkGrid[y]?.[x] !== "todo") continue;

    shrunkGrid[y][x] = "outside";

    queue.push([x - 1, y]);
    queue.push([x + 1, y]);
    queue.push([x, y - 1]);
    queue.push([x, y + 1]);
  }

  return { shrunkGrid, shrunkTiles };
}

const { shrunkGrid, shrunkTiles } = shrinkGrid(tiles);

let largestArea = 0;

for (let i = 0; i < tiles.length; i++) {
  nextRectangle: for (let j = i + 1; j < tiles.length; j++) {
    const [tx1, ty1, tx2, ty2] = rect(tiles, i, j);

    const area = (tx2 - tx1 + 1) * (ty2 - ty1 + 1);
    if (area < largestArea) continue;

    const [sx1, sy1, sx2, sy2] = rect(shrunkTiles, i, j);

    for (let x = sx1; x <= sx2; x++) {
      for (let y = sy1; y <= sy2; y++) {
        if (shrunkGrid[y]?.[x] === "outside") {
          continue nextRectangle;
        }
      }
    }

    largestArea = area;
  }
}

console.log(largestArea);
