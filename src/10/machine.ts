export async function parse() {
  const lines = await Bun.file("input.txt").text();

  const input = lines.trim().split("\n");

  const machines: Machine[] = [];

  input.forEach((line) => {
    const [_, diagramRaw, schematicsRaw, requirementsRaw] = line.match(
      /^\[(.+)\] (.+) \{(.+)\}$/
    )!;

    const diagram = diagramRaw.split("");

    const schematics = schematicsRaw
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(" ")
      .map((x) => x.split(",").map(Number));

    const requirements = requirementsRaw.split(",").map(Number);

    let diagramFlag = 0;
    diagram.reverse().forEach((x, i) => {
      if (x === "#") {
        diagramFlag |= 2 ** i;
      }
    });

    let schematicFlags: number[] = [];
    schematics.forEach((x) => {
      let flag = 0;
      x.forEach((y) => {
        flag |= 2 ** (diagram.length - 1 - y);
      });
      schematicFlags.push(flag);
    });

    machines.push({
      diagram,
      diagramFlag,
      schematics,
      schematicFlags,
      requirements,
    });
  });

  return machines;
}

export type Machine = {
  diagram: string[];
  schematics: number[][];
  requirements: number[];

  diagramFlag: number;
  schematicFlags: number[];
};
