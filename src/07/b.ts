const lines = await Bun.file("input.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const cache = new Map<string, number>();

const S = grid[0].findIndex((x) => x === "S");

function numDifferentTimelines(y: number, x: number): number {
  const key = `${y},${x}`;
  if (cache.has(key)) return cache.get(key)!;

  const result = _numDifferentTimelines(y, x);
  cache.set(key, result);
  return result;
}

function _numDifferentTimelines(y: number, x: number): number {
  if (y === grid.length - 1) return 1;

  if (grid[y][x] === "^") {
    return (
      numDifferentTimelines(y + 1, x - 1) + numDifferentTimelines(y + 1, x + 1)
    );
  }

  return numDifferentTimelines(y + 1, x);
}

console.log(numDifferentTimelines(0, S));

// [ ,  ,  ,  ,   ,  ,   , 1,   ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   ,  ,   , 1,   ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   ,  , 1 , 1, 1 ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   ,  , 1 ,  , 1 ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   , 1, 1 , 2, 1 , 1,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   , 1,   , 2,   , 1,  ,  ,  ,  ,  ]
// [ ,  ,  ,  , 1 , 1, 3 , 2, 3 , 1, 1,  ,  ,  ,  ]
// [ ,  ,  ,  , 1 ,  , 3 ,  , 3 ,  , 1,  ,  ,  ,  ]
// [ ,  ,  , 1, 1 , 4, 3 , 3, 3 , 1, 1, 1,  ,  ,  ]
// [ ,  ,  , 1,   , 4,   , 3, 3 , 1,  , 1,  ,  ,  ]
// [ ,  , 1, 1, 5 , 4, 4 , 3, 4 , 1, 2, 1, 1,  ,  ]
// [ ,  , 1,  , 5 ,  , 4 , 3, 4 ,  , 2,  , 1,  ,  ]
// [ , 1, 1, 1, 5 , 4, 4 , 7, 4 ,  , 2, 1, 1, 1,  ]
// [ , 1,  , 1, 5 , 4,   , 7, 4 ,  , 2, 1,  , 1,  ]
// [1, 1, 2, 1, 1 , 4, 11, 7, 11,  , 2, 1, 1, 1, 1]
// [1,  , 2,  , 1 ,  , 11,  , 11,  , 2, 1, 1,  , 1]

// [ ,  ,  ,  ,   ,   ,   , 40,   ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   ,   ,   , 40,   ,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   ,   , 25,   , 15,  ,  ,  ,  ,  ,  ]
// [ ,  ,  ,  ,   , 17,   , 8 ,   , 7,  ,  ,  ,  ,  ]
// [ ,  ,  ,  , 10,   , 7 ,   , 1 ,  , 6,  ,  ,  ,  ]
// [ ,  ,  , 5,   , 5 ,   , 2 , 1 , 2,  , 4,  ,  ,  ]
// [ ,  , 4,  , 1 ,   , 4 , 2 , 1 ,  , 1,  , 3,  ,  ]
// [ , 2,  , 2, 1 , 2 ,   , 2 , 1 ,  , 1, 1,  , 2,  ]
// [1,  , 1,  , 1 ,   , 1 ,   , 1 ,  , 1, 1, 1,  , 1]
