import { ethers } from "ethers";
import seed from "seed-random";
import * as Tone from "tone";

import { samples } from "./piano";
import { randomWaltz, playWaltz } from "./score";

const nearley = require("nearley");
const abcGrammar = require("./abc.js");

const projectID = "a8bd718c8f3c4190aee14fe884f36d59";

const reorgDepth = 2;  // number of blocks to ignore at the tip of the chain
const blockTime = 13.5;  // expected average block time
const blocksPerWaltz = 3;  // number of blocks seeding a single waltz
const waltzLength = blockTime * blocksPerWaltz  // length of a waltz in seconds
const measureLength = waltzLength / 24;  // length of a measure in seconds
const waltzStartDelay = 1;  // time between a new block is received and the first note

let previousWaltzStartTime = null;  // the time the previous waltz has been started
let firstWaltzIndex = null;  // index of the first played waltz
let firstWaltzTime = null;  // time at which the first waltz is started
let toneStartTime = null;  // time at which Tonejs clock is started
let lastScheduledWaltzIndex = null;  // index of the most recently scheduled waltz
let currentHead = null;  // number of the current head block

let loaded = false;
let started = false;
let muted = true;

// load samples
let sampler = new Tone.Sampler(samples, function() {
  loaded = true;
  icon.className = "fas fa-play";
});
sampler.attack = 0.4;
sampler.release = 2;
sampler.toDestination();

let hashElement = document.getElementById("hash");
let icon = document.getElementById("icon");
icon.addEventListener("click", play);

let provider = new ethers.providers.InfuraProvider('homestead', projectID);
provider.on('block', onNewBlock);

Tone.Transport.start();

function blockToWaltzIndex(blockNumber) {
  const safeHead = blockNumber - reorgDepth;
  const waltzIndex = Math.floor((safeHead - blocksPerWaltz + 1) / blocksPerWaltz);
  return waltzIndex;
}

function perfToToneTime(perfTime) {
  console.assert(toneStartTime !== null);
  return perfTime - toneStartTime
}

function toggleMute() {
  if (muted) {
    muted = false;
    sampler.volume.value = 0;
    icon.className = "fas fa-volume-up";
  } else {
    muted = true;
    sampler.volume.value = -1000000;
    icon.className = "fas fa-volume-mute";
  }
}

function blockURL(block) {
  return "https://etherscan.io/block/" + block.number.toString();
}

function start() {
  console.assert(!started);
  started = true;

  toneStartTime = performance.now() / 1000;
  Tone.start();
  icon.className = "fas fa-volume-up";
  if (currentHead !== null) {
    maybeScheduleWaltz(currentHead);
  }
}

function play() {
  if (!loaded) {
    return;
  }
  if (!started) {
    start();
  }
  toggleMute();
}

function onNewBlock(blockNumber) {
  currentHead = blockNumber;
  if (firstWaltzIndex === null) {
    firstWaltzIndex = blockToWaltzIndex(blockNumber);
    firstWaltzTime = performance.now() / 1000 + waltzStartDelay;
  }
  maybeScheduleWaltz(blockNumber);
}

function maybeScheduleWaltz(blockNumber) {
  if (!started) {
    return;
  }
  if (firstWaltzIndex === null) {
    return;
  }

  let waltzIndex = blockToWaltzIndex(blockNumber);
  if (lastScheduledWaltzIndex === null) {
    scheduleWaltz(waltzIndex);
  } else {
    for (let i = lastScheduledWaltzIndex + 1; i <= waltzIndex; i++) {
      scheduleWaltz(i);
    }
  }
  lastScheduledWaltzIndex = waltzIndex;
}

function scheduleWaltz(waltzIndex) {
  let blockPromises = [];
  for (let i = 0; i < blocksPerWaltz + 1; i++) {
    let blockNumber = waltzIndex * blocksPerWaltz + i
    blockPromises.push(provider.getBlock(blockNumber));
  }
  let allBlockPromise = Promise.all(blockPromises);

  allBlockPromise.then((blocks) => {
    let seedStr = "";
    for (let i = 0; i < blocksPerWaltz; i++) {
      seedStr += blocks[i].hash;
    }
    let rng = seed(seedStr);

    let startTime;
    if (previousWaltzStartTime === null) {
      startTime = perfToToneTime(firstWaltzTime);
    } else {
      startTime = Math.max(previousWaltzStartTime + waltzLength, Tone.now() + waltzStartDelay);
    }
    previousWaltzStartTime = startTime;

    let waltz = randomWaltz(rng);
    playWaltz(sampler, waltz, startTime, measureLength);

    for (let i = 0; i < blocksPerWaltz; i++) {
      let hashSwitchTime = startTime + i * waltzLength / blocksPerWaltz
      Tone.Transport.scheduleOnce(function(time) {
        hashElement.innerHTML = blocks[i].hash.slice(0, 10);
        hashElement.setAttribute("href", blockURL(blocks[i])); 
      }, hashSwitchTime > Tone.now() ? hashSwitchTime : undefined);
    }
  });
}
