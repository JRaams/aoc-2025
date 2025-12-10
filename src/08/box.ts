import { Heap } from "../../helpers/heap";

type BoxPair = [number, number, number];

export async function parse() {
  const lines = await Bun.file("input.txt").text();

  const boxes = lines
    .trim()
    .split("\n")
    .map((x) => x.split(",").map(Number));

  const pairsToConnect = new Heap<BoxPair>((a, b) => a[2] - b[2], []);

  for (let a = 0; a < boxes.length - 1; a++) {
    const [x1, y1, z1] = boxes[a];

    for (let b = a + 1; b < boxes.length; b++) {
      const [x2, y2, z2] = boxes[b];

      const distance =
        Math.abs(x1 - x2) ** 2 +
        Math.abs(y1 - y2) ** 2 +
        Math.abs(z1 - z2) ** 2;

      pairsToConnect.insert([a, b, distance]);
    }
  }

  return { boxes, pairsToConnect };
}

export class UnionFind {
  private parents: number[];
  public circuitSizes: number[];

  constructor(size: number) {
    this.parents = Array.from({ length: size }, (_, i) => i);
    this.circuitSizes = Array.from({ length: size }, () => 1);
  }

  findCircuit(index: number): number {
    if (this.parents[index] === index) return index;

    this.parents[index] = this.findCircuit(this.parents[index]);

    return this.parents[index];
  }

  connect(a: number, b: number): number {
    let A = this.findCircuit(a);
    let B = this.findCircuit(b);

    if (A === B) return 0;

    if (this.circuitSizes[A] > this.circuitSizes[B]) {
      [A, B] = [B, A];
    }

    this.parents[A] = B;
    this.circuitSizes[B] += this.circuitSizes[A];

    return this.circuitSizes[B];
  }
}
