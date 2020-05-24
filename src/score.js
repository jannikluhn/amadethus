import * as Tone from "tone";
import measureTable from "./k516f.csv";

const nearley = require("nearley");
const abcGrammar = require("./abc.js");


// first index: bar number, second index: dice result
const measureIndices = [
  [96, 32, 69, 40, 148, 104, 152, 119, 98, 3, 54],
  [22, 6, 95, 17, 74, 157, 60, 84, 142, 87, 130],
  [141, 128, 158, 113, 169, 27, 171, 114, 42, 165, 10],
  [41, 69, 19, 85, 45, 167, 58, 50, 156, 61, 103],
  [105, 146, 153, 161, 80, 154, 99, 140, 75, 135, 28],
  [122, 46, 55, 2, 97, 68, 133, 86, 129, 47, 37],
  [11, 134, 110, 159, 36, 118, 21, 169, 62, 147, 106],
  [30, 81, 24, 100, 107, 91, 127, 94, 123, 33, 5],
  [70, 117, 66, 90, 25, 138, 16, 120, 65, 102, 35],
  [121, 39, 139, 176, 143, 71, 155, 88, 77, 4, 20],
  [26, 126, 15, 7, 64, 150, 57, 48, 19, 31, 108],
  [9, 56, 132, 34, 125, 29, 175, 166, 82, 164, 92],
  [112, 174, 73, 67, 76, 101, 43, 51, 137, 144, 12],
  [49, 18, 58, 160, 136, 162, 168, 115, 38, 59, 124],
  [109, 116, 145, 52, 1, 23, 89, 72, 149, 173, 44],
  [14, 83, 79, 170, 93, 151, 172, 111, 8, 78, 131]
];

function getRawMeasurePair(index) {
  const rightIndex = (index - 1) * 2;
  const leftIndex = (index - 1) * 2 + 1;
  const rightRow = measureTable[rightIndex];
  const leftRow = measureTable[leftIndex];
  console.assert(rightRow[0] == "G");
  console.assert(leftRow[0] == "F");
  console.assert(parseInt(rightRow[1]) == index);
  console.assert(parseInt(leftRow[1]) == index);
  return [rightRow[2], leftRow[2]];
}

function parseMeasure(rawMeasure) {
  const abcParser = new nearley.Parser(nearley.Grammar.fromCompiled(abcGrammar));
  abcParser.feed(rawMeasure);
  return abcParser.results[0];
}

function parseMeasurePair(rawMeasurePair) {
  return [parseMeasure(rawMeasurePair[0]), parseMeasure(rawMeasurePair[1])];
}

function noteToSymbol(pitchClass, octave, accidental) {
  var accidentalSymbol;
  if (accidental === null || accidental == "=") {
    accidentalSymbol = "";
  } else if (accidental == "^") {
    accidentalSymbol = "#";
  } else {
    console.assert("unhandled");
  }
  return pitchClass + accidentalSymbol + octave.toString();
}

function isClose(value, target) {
  return Math.abs(value - target) < 0.01;
}

function getAccentVelocity(relTime) {
  if (isClose(relTime, 0)) {
    return 1;
  } else if (isClose(relTime, 1) || isClose(relTime, 2)) {
    return 0.85;
  } else {
    return 0.6;
  }
}

function getCompVelocity(numNotes) {
  return 1 / Math.pow(numNotes, 0.20);
}

function getMeasureVelocity(index) {
  if (index % 8 == 0) {
    return 0.8;
  } else if (index % 4 == 0) {
    return 0.7;
  } else if (index % 2 == 0) {
    return 0.6;
  } else if (index % 8 == 7) {
    return 0.4;
  } else {
    return 0.5;
  }
}

function playMeasure(sampler, measure, time, length, velocity) {
  var relTime = 0;
  var accidentals = {};
  for (let i = 0; i < measure.length; i++) {
    let chord = measure[i];
    let chordLength = chord[0].length * length / 3;

    let chordNoteSymbols = [];
    for (let note of chord) {
      if (note.accidental) {
        accidentals[note.pitchClass] = note.accidental;
      }
      let symbol = noteToSymbol(note.pitchClass, note.octave, accidentals[note.pitchClass] || null);
      chordNoteSymbols.push(symbol);
    }

    const accentVelocity = getAccentVelocity(relTime);
    const compVelocity = getCompVelocity(chord.length);
    const totalVelocity = velocity * accentVelocity * compVelocity;

    if (time + relTime >= Tone.now()) {
      for (let noteSymbol of chordNoteSymbols) {
        sampler.triggerAttack(noteSymbol, time + relTime, totalVelocity);
      }
    }

    relTime += chordLength;
  }
  sampler.releaseAll(time + length);
}

function playMeasurePair(sampler, measurePair, time, length, velocity) {
  for (let measure of measurePair) {
    playMeasure(sampler, measure, time, length, velocity)
  }
}

function playWaltz(sampler, waltz, time, measureLength) {
  console.assert(waltz.length == 24);
  for (let index = 0; index < waltz.length; index++) {
    let measurePair = waltz[index];
    let velocity = getMeasureVelocity(index);

    playMeasurePair(sampler, measurePair, time, measureLength, velocity);
    time += measureLength;
  }
}

function diceToIndex(n) {
  return n - 2;
}

function throwDie(rng) {
  return Math.floor(rng() * 6) + 1;
}

function throwDice(rng) {
  return throwDie(rng) + throwDie(rng);
}

function randomMeasure(rng, measureIndex) {
  let dice = throwDice(rng);
  let index = measureIndices[measureIndex][diceToIndex(dice)]
  let rawMeasurePair = getRawMeasurePair(index);
  let measurePair = parseMeasurePair(rawMeasurePair);
  return measurePair;
}

function randomWaltz(rng) {
  let repeatedPart = []
  for (let measureIndex = 0; measureIndex < 7; measureIndex++) {
    const measure = randomMeasure(rng, measureIndex);
    repeatedPart.push(measure);
  }

  const eigthMeasure = randomMeasure(rng, 7);

  let finalPart = [];
  for (let measureIndex = 8; measureIndex < 16; measureIndex++) {
    const measure = randomMeasure(rng, measureIndex);
    finalPart.push(measure);
  }

  let waltz = [];
  waltz.push(...repeatedPart);
  waltz.push([[], eigthMeasure[1]]);
  waltz.push(...repeatedPart);
  waltz.push([eigthMeasure[0], []]);
  waltz.push(...finalPart);
  return waltz;
}

export {randomWaltz, playWaltz};
