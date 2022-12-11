const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

let pwd: string[] = [];
const sizes: { [key: string]: number } = {};

input.split(newLine).forEach((row) => {
  switch (true) {
    case row === '$ cd /': {
      pwd = [];
      break;
    }
    case row === '$ cd ..': {
      pwd.pop();
      break;
    }
    case row.startsWith('$ cd '): {
      const dir = row.split(' ')[2];
      pwd.push(dir);
      break;
    }
    case row === '$ ls':
    case row.startsWith('dir '):
      break;
    default: {
      const size = Number(row.split(' ')[0]);
      pwd
        .reduce((a, b, i) => [...a, `${i}${a.join('')}${b}`], [] as string[])
        .forEach((dirKey) => {
          sizes[dirKey] = (sizes[dirKey] ?? 0) + size;
        });
    }
  }
});

const result1 = Object.values(sizes)
  .filter((s) => s <= 100000)
  .reduce((a, b) => a + b, 0);

const needed =
  Object.keys(sizes)
    .filter((k) => k.startsWith('0'))
    .map((k) => sizes[k])
    .reduce((a, b) => a + b, 0) - 40000000;

const result2 = Math.min(...Object.values(sizes).filter((s) => s >= needed));

console.log(result1);
console.log(result2);
