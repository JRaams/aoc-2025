const lines = await Bun.file("input.txt").text();

const regions = lines.trim().split("\n\n").at(-1)!.split("\n");

let fit = 0;

regions.forEach((region) => {
  const [sizeRaw, shapesRaw] = region.split(": ");

  const [width, length] = sizeRaw.split("x").map(Number);

  const presents = shapesRaw.split(" ").map(Number);

  const regionArea = width * length;
  const presentsArea = presents.reduce((a, b) => a + b * 9, 0);

  if (presentsArea <= regionArea) {
    fit++;
  }
});

console.log(fit);
