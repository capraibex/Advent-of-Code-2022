const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

let result1 = 0;
let result2 = '';
let cycle = 0;
let spritePos = [1, 2, 3];
const cycles = [20, 60, 100, 140, 180, 220];

function incrementAndDraw() {
  cycle++;
  if (cycles.includes(cycle)) {
    result1 += spritePos[0] * cycle;
  }
  result2 += spritePos.includes(cycle % 40) ? '#' : '.';
}

input.split(newLine).forEach(row => {
  if (row === 'noop') {
    incrementAndDraw();
  } else {
    const addx = Number(row.split(' ')[1]);
    incrementAndDraw();
    incrementAndDraw();
    spritePos = spritePos.map(pos => pos + addx);    
  }
})

console.log(result1)
console.log(result2.match(/.{40}/g)!.join('\n'))