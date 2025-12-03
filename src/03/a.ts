const lines = await Bun.file("input.txt").text();

const banks = lines
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number));

let maxJoltageSum = 0;

banks.forEach((bank) => {
  const digits: number[] = [];

  let start = 0;

  while (digits.length < 2) {
    const end = bank.length - 2 + digits.length;

    let localMax = 0;

    for (let i = start; i <= end; i++) {
      if (localMax < bank[i]) {
        localMax = bank[i];
        start = i + 1;
      }
    }

    digits.push(localMax);
  }

  maxJoltageSum += Number(digits.join(""));
});

console.log(maxJoltageSum);
