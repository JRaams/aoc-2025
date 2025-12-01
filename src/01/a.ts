const input = await Bun.file("input.txt").text();

const rotations = input.trim().split("\n");

let dial = 50;
let password = 0;

for (const rotation of rotations) {
  const direction = rotation[0];
  const distance = Number(rotation.slice(1));

  if (direction === "R") {
    dial = (dial + distance) % 100;
  } else {
    dial = (dial - distance) % 100;
  }

  if (dial === 0) {
    password++;
  }
}

console.log(password);
