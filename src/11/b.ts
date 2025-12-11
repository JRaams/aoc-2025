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

function numWaysToOutMemo(device: string, dac: boolean, fft: boolean): number {
  const key = `${device},${dac},${fft}`;
  if (cache.has(key)) return cache.get(key)!;

  const result = numWaysToOut(device, dac, fft);
  cache.set(key, result);
  return result;
}

function numWaysToOut(device: string, dac: boolean, fft: boolean): number {
  if (device === "out" && dac && fft) return 1;
  else if (device === "dac") dac = true;
  else if (device === "fft") fft = true;

  return outputs[device].reduce(
    (sum, attachedDevice) => sum + numWaysToOutMemo(attachedDevice, dac, fft),
    0
  );
}

console.log(numWaysToOutMemo("svr", false, false));
