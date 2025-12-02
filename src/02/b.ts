const lines = await Bun.file("input.txt").text();
const input = lines
  .trim()
  .split(",")
  .map((x) => x.split("-").map(Number));

const repeatingDigitsRegex = new RegExp(/^(\d+)\1+$/);

let invalidIDsum = 0;

input.forEach(([min, max]) => {
  for (let id = min; id <= max; id++) {
    const str = id.toString();

    if (repeatingDigitsRegex.test(str)) {
      invalidIDsum += id;
    }
  }
});

console.log(invalidIDsum);
