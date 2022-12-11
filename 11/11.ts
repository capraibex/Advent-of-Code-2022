function solve(part: number) {
  const monkeys = {
    0: {
      itemCount: 0,
      items: [54, 61, 97, 63, 74],
      operation: (old: number) => old * 7,
      test: (v: number) => (v % 17 === 0 ? 5 : 3),
    },
    1: {
      itemCount: 0,
      items: [61, 70, 97, 64, 99, 83, 52, 87],
      operation: (old: number) => old + 8,
      test: (v: number) => (v % 2 === 0 ? 7 : 6),
    },
    2: {
      itemCount: 0,
      items: [60, 67, 80, 65],
      operation: (old: number) => old * 13,
      test: (v: number) => (v % 5 === 0 ? 1 : 6),
    },
    3: {
      itemCount: 0,
      items: [61, 70, 76, 69, 82, 56],
      operation: (old: number) => old + 7,
      test: (v: number) => (v % 3 === 0 ? 5 : 2),
    },
    4: {
      itemCount: 0,
      items: [79, 98],
      operation: (old: number) => old + 2,
      test: (v: number) => (v % 7 === 0 ? 0 : 3),
    },
    5: {
      itemCount: 0,
      items: [72, 79, 55],
      operation: (old: number) => old + 1,
      test: (v: number) => (v % 13 === 0 ? 2 : 1),
    },
    6: {
      itemCount: 0,
      items: [63],
      operation: (old: number) => old + 4,
      test: (v: number) => (v % 19 === 0 ? 7 : 4),
    },
    7: {
      itemCount: 0,
      items: [72, 51, 93, 63, 80, 86, 81],
      operation: (old: number) => old * old,
      test: (v: number) => (v % 11 === 0 ? 0 : 4),
    },
  };

  // LCD -> all "divisible by" multiplied
  const mod = 9699690;

  for (let i = 0; i < (part === 1 ? 20 : 10000); i++) {
    Object.values(monkeys).forEach((monkey) => {
      monkey.items.forEach((item) => {
        const worryLevel = part === 1 ? Math.floor(monkey.operation(item) / 3) : monkey.operation(item) % mod;
        const newMonkey = monkey.test(worryLevel);
        monkeys[newMonkey].items.push(worryLevel);
      });
      monkey.itemCount += monkey.items.length;
      monkey.items = [];
    });
  }

  const result = Object.values(monkeys)
    .map((monkey) => monkey.itemCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);

  console.log(result);
}

solve(1);
solve(2);
