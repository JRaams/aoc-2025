const lines = await Bun.file("input.txt").text();
const input = lines
  .trim()
  .split(",")
  .map((x) => x.split("-").map(Number));

let invalidIDsum = 0;

input.forEach(([min, max]) => {
  for (let id = min; id <= max; id++) {
    const str = id.toString();

    if (str.length % 2 !== 0) continue;

    if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) {
      invalidIDsum += id;
    }
  }
});

console.log(invalidIDsum);
