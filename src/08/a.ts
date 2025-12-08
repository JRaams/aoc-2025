import { parse, UnionFind } from "./box";

const { boxes, pairsToConnect } = await parse();

const uf = new UnionFind(boxes.length);

for (let connected = 0; connected < 1000; connected++) {
  const [a, b, _] = pairsToConnect.pop()!;
  uf.connect(a, b);
}

for (let i = 0; i < boxes.length; i++) {
  uf.findCircuit(i);
}

uf.circuitSizes.sort((a, b) => b - a);

const result = uf.circuitSizes[0] * uf.circuitSizes[1] * uf.circuitSizes[2];

console.log(result);
