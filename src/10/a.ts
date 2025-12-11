async function parse() {
  const lines = await Bun.file("input.txt").text();

  const input = lines.trim().split("\n");

  const machines: Machine[] = [];

  input.forEach((line) => {
    const [_, diagramRaw, schematicsRaw, _requirementsRaw] = line.match(
      /^\[(.+)\] (.+) \{(.+)\}$/
    )!;

    const diagram = diagramRaw.split("");

    const schematics = schematicsRaw
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(" ")
      .map((x) => x.split(",").map(Number));

    let diagramFlag = 0;
    diagram.reverse().forEach((x, i) => {
      if (x === "#") {
        diagramFlag |= 1 << i;
      }
    });

    let schematicFlags: number[] = [];
    schematics.forEach((x) => {
      let flag = 0;
      x.forEach((y) => {
        flag |= 1 << (diagram.length - 1 - y);
      });
      schematicFlags.push(flag);
    });

    machines.push({ diagramFlag, schematicFlags });
  });

  return machines;
}

type Machine = {
  diagramFlag: number;
  schematicFlags: number[];
};

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

const machines = await parse();

const result = machines.reduce((sum, m) => sum + minButtonPresses(m), 0);

console.log(result);
