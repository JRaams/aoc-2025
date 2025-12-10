import { parse, UnionFind } from "./box";

const { boxes, pairsToConnect } = await parse();

const uf = new UnionFind(boxes.length);

while (pairsToConnect.size() > 0) {
  const [a, b, _] = pairsToConnect.pop()!;

  const numConnected = uf.connect(a, b);

  if (numConnected === boxes.length) {
    const [x1, _y1, _z1] = boxes[a];
    const [x2, _y2, _z2] = boxes[b];
    console.log(x1 * x2);
    break;
  }
}
