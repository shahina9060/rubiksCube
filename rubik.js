// Rubik's Cube Solver in JavaScript

class RubiksCube {
 constructor() {
 // Face colors: U - white, D - yellow, L - orange, R - red, F - green, B - blue
 this.faces = {
 U: Array(9).fill('w'),
 D: Array(9).fill('y'),
 L: Array(9).fill('o'),
 R: Array(9).fill('r'),
 F: Array(9).fill('g'),
 B: Array(9).fill('b'),
 };
 this.steps = [];
 }

 // Rotate a face clockwise or counter-clockwise
 rotateFace(face, clockwise = true) {
 const map = clockwise
 ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
 : [2, 5, 8, 1, 4, 7, 0, 3, 6];
 const newFace = [];
 for (let i = 0; i < 9; i++) newFace[i] = this.faces[face][map[i]];
 this.faces[face] = newFace;
 }

 // Rotate one side with its adjacent face updates
 rotate(side, clockwise = true) {
 this.steps.push(`${side}${clockwise ? '' : "'"}`);
 const f = this.faces;
 this.rotateFace(side, clockwise);

 const adj = {
 U: [['B', 0, 1, 2], ['R', 0, 1, 2], ['F', 0, 1, 2], ['L', 0, 1, 2]],
 D: [['F', 6, 7, 8], ['R', 6, 7, 8], ['B', 6, 7, 8], ['L', 6, 7, 8]],
 L: [['U', 0, 3, 6], ['F', 0, 3, 6], ['D', 0, 3, 6], ['B', 8, 5, 2]],
 R: [['U', 8, 5, 2], ['B', 0, 3, 6], ['D', 8, 5, 2], ['F', 8, 5, 2]],
 F: [['U', 6, 7, 8], ['R', 0, 3, 6], ['D', 2, 1, 0], ['L', 8, 5, 2]],
 B: [['U', 2, 1, 0], ['L', 0, 3, 6], ['D', 6, 7, 8], ['R', 8, 5, 2]],
 };

 let temp = [];
 for (let i = 0; i < 3; i++) temp[i] = f[adj[side][clockwise ? 3 : 0][0]][adj[side][clockwise ? 3 : 0][i + 1]];
 for (let i = 3; i > 0; i--) {
 for (let j = 0; j < 3; j++) {
 f[adj[side][i][0]][adj[side][i][j + 1]] = f[adj[side][i - 1][0]][adj[side][i - 1][j + 1]];
 }
 }
 for (let i = 0; i < 3; i++) f[adj[side][0][0]][adj[side][0][i + 1]] = temp[i];
 }

 // Scramble the cube randomly
 scramble(steps = 20) {
 const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
 for (let i = 0; i < steps; i++) {
 const move = moves[Math.floor(Math.random() * 6)];
 const clockwise = Math.random() > 0.5;
 this.rotate(move, clockwise);
 }
 }

 // Dummy solver (just reverses the steps)
 solve() {
 const reverse = [];
 for (let i = this.steps.length - 1; i >= 0; i--) {
 let move = this.steps[i];
 if (move.includes("'")) move = move.replace("'", '');
 else move += "'";
 reverse.push(move);
 }
 this.steps = [];
 for (let m of reverse) this.rotate(m[0], m.length === 1);
 return reverse;
 }

 // Flatten cube into a single string for rendering
 getCubeString() {
 return (
 this.faces.U.join('') +
 this.faces.R.join('') +
 this.faces.F.join('') +
 this.faces.D.join('') +
 this.faces.L.join('') +
 this.faces.B.join('')
 );
 }

 // Display the cube state as a step
 logCubeState() {
 console.log(this.getCubeString());
 }
}

// Example Usage
const cube = new RubiksCube();
cube.scramble();
console.log('Scrambled Cube:');
cube.logCubeState();

const solution = cube.solve();
console.log('Solved Steps:', solution);
cube.logCubeState();




