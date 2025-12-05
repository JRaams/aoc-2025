const lines = await Bun.file("input.txt").text();

const [rangesRaw, idsRaw] = lines.trim().split("\n\n");

const ranges = rangesRaw.split("\n").map((x) => x.split("-").map(Number));

const ids = idsRaw.split("\n").map(Number);

let fresh = 0;

ids.forEach((id) => {
  for (const [min, max] of ranges) {
    if (min <= id && id <= max) {
      fresh++;
      return;
    }
  }
});

console.log(fresh);
