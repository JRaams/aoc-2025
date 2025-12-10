import { parse, type Machine } from "./machine";

const machines = await parse();

function minButtonPresses(machine: Machine): number {
  const seen = new Set<number>();

  const queue: [number, number][] = [[0, 0]];

  while (queue.length > 0) {
    const [lights, presses] = queue.shift()!;

    if (seen.has(lights)) continue;
    seen.add(lights);

    if (lights === machine.diagramFlag) {
      return presses;
    }

    machine.schematicFlags.forEach((flag) => {
      queue.push([lights ^ flag, presses + 1]);
    });
  }

  throw new Error("No solution found");
}

const result = machines.reduce((sum, m) => sum + minButtonPresses(m), 0);

console.log(result);
