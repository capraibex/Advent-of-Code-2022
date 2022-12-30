const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

interface Valve {
  valve: string;
  rate: number;
  tunnels: string[];
}

interface ValveMap {
  [valvle: string]: Valve;
}

interface DistanceMatrix {
  [startValve: string]: { [endValve: string]: number };
}

const valves: ValveMap = input
  .split(newLine)
  .map((row) => row.split(' '))
  .reduce(
    (acc, parts) => ({
      ...acc,
      [parts[1]]: {
        valve: parts[1],
        rate: Number(parts[4].match(/\d+/)),
        tunnels: parts
          .slice(9)
          .filter((s) => /[A-Z]{2}/g.test(s))
          .map((x) => x.substring(0, 2)),
      },
    }),
    {}
  );

const nonZeroValves = Object.keys(valves).filter((v) => valves[v].rate > 0);

function breadthFirstSearch(start: string, end: string): number {
  const queue: string[][] = [[start]];
  const seen = new Set(start);

  while (queue.length > 0) {
    const path = queue.shift() as string[];
    const valve = path[path.length - 1];

    for (const tunnel of valves[valve].tunnels.filter((v) => !seen.has(v))) {
      if (tunnel === end) {
        return path.length;
      }

      seen.add(tunnel);
      queue.push([...path, tunnel]);
    }
  }

  return 0;
}

function getPressures(
  distances: DistanceMatrix,
  valve: string,
  minutes: number,
  nonZeroValves: string[],
  alreadyOpenedValves = {}
): { [valve: string]: number }[] {
  return nonZeroValves
    .filter((v) => minutes - distances[valve][v] - 1 > 0)
    .reduce(
      (acc, curr, i, arr) => {
        const nextMinutes = minutes - distances[valve][curr] - 1;
        const nextNonZeroValves = arr.filter((_, idx) => idx !== i);
        const nextAlreadyOpenedValves = { ...alreadyOpenedValves, [curr]: nextMinutes };

        return [...acc, ...getPressures(distances, curr, nextMinutes, nextNonZeroValves, nextAlreadyOpenedValves)];
      },
      [alreadyOpenedValves]
    );
}

function getMaxPressureOfPath(path: { [valve: string]: number }): number {
  return Object.entries(path).reduce((acc, [valve, pressure]) => acc + valves[valve].rate * pressure, 0);
}

const distances: DistanceMatrix = Object.keys(valves).reduce(
  (acc, startValve) => ({
    ...acc,
    [startValve]: Object.keys(valves)
      .filter((v) => v !== startValve)
      .reduce(
        (acc2, endValve) => ({
          ...acc2,
          [endValve]: breadthFirstSearch(startValve, endValve),
        }),
        {}
      ),
  }),
  {}
);

const result1 = getPressures(distances, 'AA', 30, nonZeroValves).reduce(
  (maxPressure, path) => Math.max(maxPressure, getMaxPressureOfPath(path)),
  -Infinity
);

const maxPressures = getPressures(distances, 'AA', 26, nonZeroValves).reduce((acc, path) => {
  const pathKey = Object.keys(path).sort().join();

  return { ...acc, [pathKey]: Math.max(acc[pathKey] ?? -Infinity, getMaxPressureOfPath(path)) };
}, {});

const result2 = Object.keys(maxPressures).reduce(
  (maxPressure, curr) =>
    Math.max(
      maxPressure,
      Object.keys(maxPressures)
        .filter((k) => curr.split(',').every((p) => !k.split(',').includes(p)))
        .reduce((acc2, curr2) => Math.max(acc2, maxPressures[curr] + maxPressures[curr2]), maxPressure)
    ),
  -Infinity
);

console.log(result1);
console.log(result2);
