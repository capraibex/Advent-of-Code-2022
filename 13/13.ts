const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

function isInRightOrder(arr1: unknown[], arr2: unknown[]): boolean | undefined {
  for (let i = 0; i < arr1.length; i++) {
    const v1 = arr1[i];
    const v2 = arr2[i];

    if (v2 == null) {
      return false;
    }

    if (typeof v1 === 'number' && typeof v2 === 'number') {
      if (v1 === v2) {
        continue;
      }
      return v1 < v2;
    }

    if (Array.isArray(v1) && Array.isArray(v2)) {
      const isInOrder = isInRightOrder(v1, v2);
      if (isInOrder == null) {
        continue;
      }
      return isInOrder;
    }

    const isInOrder = typeof v1 === 'number' ? isInRightOrder([v1], v2 as unknown[]) : isInRightOrder(v1 as unknown[], [v2]);
    if (isInOrder == null) {
      continue;
    }
    return isInOrder;
  }

  return arr2.length > arr1.length || undefined;
}

const result1 = input
  .split(`${newLine}${newLine}`)
  .map((group) => group.split(newLine).map(eval))
  .reduce((acc, [arr1, arr2], i) => acc + Number(isInRightOrder(arr1, arr2)) * (i + 1), 0);

const two = [[2]];
const six = [[6]];
const sortedPackets = input
  .split(newLine)
  .filter(Boolean)
  .map(eval)
  .concat([two, six])
  .sort((a, b) => (isInRightOrder(a, b) ? -1 : 1));

const result2 = (sortedPackets.indexOf(two) + 1) * (sortedPackets.indexOf(six) + 1);

console.log(result1);
console.log(result2);
