
// Test Suite for New Micro-Games
const assert = require('assert');

// Mock Browser Environment
global.document = {
    getElementById: () => ({
        addEventListener: () => {},
        appendChild: () => {},
        style: {},
        innerHTML: '',
        textContent: ''
    }),
    createElement: () => ({
        className: '',
        style: {},
        dataset: {},
        textContent: '',
        addEventListener: () => {},
        appendChild: () => {}
    }),
    querySelectorAll: () => Array(9).fill({ style: {} }),
    head: { appendChild: () => {} }
};
global.window = {};

// Mock Engine
const mockEngine = {
    currentSession: {
        difficulty: 3,
        score: 0,
        mistakes: []
    },
    addScore: (points) => { mockEngine.currentSession.score += points; },
    addMistake: (msg) => { mockEngine.currentSession.mistakes.push(msg); },
    recordResponse: (isCorrect, time) => {},
    showFeedback: () => {}
};

// Import Games (Assuming CommonJS export added)
const StroopChallenge = require('../games/StroopChallenge');
const DualNBack = require('../games/DualNBack');

console.log("🎮 Starting Game Module Tests...\n");

// --- STROOP TEST ---
console.log("🌈 Testing Stroop Challenge...");
const stroop = new StroopChallenge({}, mockEngine);
stroop.init();
stroop.start();

// Simulate Round
stroop.currentRound = { target: 'BLUE', distractor: 'RED', startTime: Date.now() };
stroop.active = true;

// Correct Answer
stroop.handleInput('BLUE');
if (mockEngine.currentSession.score === 100) console.log("✅ PASS: Stroop Correct Answer");
else console.log("❌ FAIL: Stroop Scoring");

// Wrong Answer
stroop.handleInput('RED');
if (mockEngine.currentSession.mistakes.length === 1) console.log("✅ PASS: Stroop Error Handling");
else console.log("❌ FAIL: Stroop Mistake Recording");


// --- N-BACK TEST ---
console.log("\n🧠 Testing Dual N-Back...");
const nback = new DualNBack({}, mockEngine);
nback.init();
nback.start();

// Simulate History: [Position 5 (Match), Position 2, Position 5]
// If N=2, current (5) matches 2-back (5).
nback.nLevel = 2;
nback.history = [
    { position: 5, isMatch: false },
    { position: 2, isMatch: false },
    { position: 5, isMatch: true } // Current
];
nback.playerResponded = false;
nback.currentRoundStart = Date.now();

// Claim Match
nback.handleMatchClaim();
if (mockEngine.currentSession.score === 250) console.log("✅ PASS: N-Back Match Claim (100+150)");
else console.log(`❌ FAIL: N-Back Scoring (Expected 250, got ${mockEngine.currentSession.score})`);

console.log("\n✨ All Game Tests Complete.");
