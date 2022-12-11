const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

const forrest = input.split(newLine).map((row) => [...row].map(Number));
const [w, h] = [forrest[0].length, forrest.length];
const cpy = [...new Array(h)].map((_) => [...new Array(w).fill(0)]);

forrest.forEach((row, y) => {
  let last: number;
  row.forEach((v, x) => {
    if (last == null || v > last) {
      cpy[y][x] = 1;
      last = v;
    }
  });

  let lastR: number;
  [...row].reverse().forEach((v, x) => {
    if (lastR == null || v > lastR) {
      cpy[y][w - x - 1] = 1;
      lastR = v;
    }
  });
});

forrest[0].forEach((_, x) => {
  let last: number;
  forrest
    .map((f) => f[x])
    .forEach((v, y) => {
      if (last == null || v > last) {
        cpy[y][x] = 1;
        last = v;
      }
    });

  let lastR: number;
  forrest
    .map((f) => f[x])
    .reverse()
    .forEach((v, y) => {
      if (lastR == null || v > lastR) {
        cpy[h - y - 1][x] = 1;
        lastR = v;
      }
    });
});

const result1 = cpy.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0);

console.log(result1);

function getScore(v: number, x: number, y: number): number {
  if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
    return 0;
  }

  let top = 0;
  for (let j = y - 1; j >= 0; j--) {
    top++;
    if (forrest[j][x] >= v) {
      break;
    }
  }

  let right = 0;
  for (let i = x + 1; i < w; i++) {
    right++;
    if (forrest[y][i] >= v) {
      break;
    }
  }

  let bottom = 0;
  for (let j = y + 1; j < h; j++) {
    bottom++;
    if (forrest[j][x] >= v) {
      break;
    }
  }
  let left = 0;
  for (let i = x - 1; i >= 0; i--) {
    left++;
    if (forrest[y][i] >= v) {
      break;
    }
  }

  return top * right * bottom * left;
}

forrest.forEach((row, y) =>
  row.forEach((v, x) => {
    cpy[y][x] = getScore(v, x, y);
  })
);

const result2 = Math.max(...cpy.flat());

console.log(result2);
