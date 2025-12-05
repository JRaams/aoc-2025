const lines = await Bun.file("input.txt").text();

const [rangesRaw, _] = lines.trim().split("\n\n");

const ranges = rangesRaw.split("\n").map((x) => x.split("-").map(Number));

ranges.sort((a, b) => a[0] - b[0]);

let fresh = 0;
let prevID = 0;

for (let [min, max] of ranges) {
  if (max < prevID) {
    continue;
  }

  if (min < prevID) {
    min = prevID;
  }

  fresh += max - min + 1;

  prevID = max + 1;
}

console.log(fresh);

/**
012345678901234567890
   XXX                3-5
          XXXXX       10-14
                XXXXX 16-20
            XXXXXXX   12-18
*/
