import { init } from "z3-solver";
import { readFileSync } from "node:fs";

function parse() {
  const lines = readFileSync("input.txt", "utf8");

  const input = lines.trim().split("\n");

  const machines = [];

  input.forEach((line) => {
    const [_, _diagramRaw, schematicsRaw, requirementsRaw] = line.match(
      /^\[(.+)\] (.+) \{(.+)\}$/
    );

    const schematics = schematicsRaw
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(" ")
      .map((x) => x.split(",").map(Number));

    const requirements = requirementsRaw.split(",").map(Number);

    machines.push({ schematics, requirements });
  });

  return machines;
}

// Credits to hyperneutrino for their Python solution: https://github.com/hyperneutrino/advent-of-code/blob/f5cca607d23c320d891bbcb0008ff5b0fdde75a1/2025/day-10/part-2.py
async function findFewestPresses(ctx, schematics, requirements) {
  const { Optimize, Int, isIntVal } = ctx;
  const optimize = new Optimize();

  const buttonPresses = schematics.map((_, i) => Int.const(`n${i}`));

  buttonPresses.forEach((buttonPress) => {
    optimize.add(buttonPress.ge(0));
  });

  requirements.forEach((requirement, ri) => {
    let equation = Int.val(0);

    schematics.forEach((schematic, bi) => {
      if (schematic.includes(ri)) {
        equation = equation.add(buttonPresses[bi]);
      }
    });

    optimize.add(equation.eq(Int.val(requirement)));
  });

  const machinePresses = buttonPresses.reduce(
    (sum, v) => sum.add(v),
    Int.val(0)
  );

  optimize.minimize(machinePresses);

  await optimize.check();

  const modelResult = optimize.model().eval(machinePresses);

  if (isIntVal(modelResult)) {
    return Number(modelResult.value());
  }

  throw new Error("No solution found");
}

const { Context } = await init();

const ctx = Context("main");

const machines = parse();

let totalPresses = 0;

for (const machine of machines) {
  const machinePresses = await findFewestPresses(
    ctx,
    machine.schematics,
    machine.requirements
  );

  totalPresses += machinePresses;
}

console.log(totalPresses);
