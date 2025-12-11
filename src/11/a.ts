import { defaultDict } from "../../helpers/defaultdict";

const lines = await Bun.file("input.txt").text();

const outputs = defaultDict(() => [] as string[]);

lines
  .trim()
  .split("\n")
  .forEach((line) => {
    const [name, attached] = line.split(": ");
    outputs[name] = attached.split(" ");
  });

const cache = new Map<string, number>();

function numWaysToOutMemo(device: string): number {
  if (cache.has(device)) return cache.get(device)!;

  const result = numWaysToOut(device);
  cache.set(device, result);
  return result;
}

function numWaysToOut(device: string): number {
  if (device === "out") return 1;

  return outputs[device].reduce(
    (sum, attachedDevice) => sum + numWaysToOutMemo(attachedDevice),
    0
  );
}

console.log(numWaysToOutMemo("you"));
