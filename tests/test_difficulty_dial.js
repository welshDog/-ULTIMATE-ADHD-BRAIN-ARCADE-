
// Test Suite for DifficultyDial Agent
const DifficultyDial = require('../agents/DifficultyDial');

const agent = new DifficultyDial({
    windowSize: 3,
    boredomThresholdMs: 1000,
    frustrationThreshold: 2
});

console.log("🚦 Starting DifficultyDial Analysis...\n");

// Test 1: Frustration Detection
console.log("--- Test 1: Frustration (2 consecutive errors) ---");
agent.reset(5); // Start at level 5
console.log(`Start Level: ${agent.getCurrentLevel()}`);

let res = agent.recordResponse(false, 2000); // Error 1
console.log(`Response 1 (Error): ${res.action}`);

res = agent.recordResponse(false, 2000); // Error 2
console.log(`Response 2 (Error): ${res.action} -> Level ${res.level} (${res.reason})`);

if (res.level === 4) console.log("✅ PASS: Difficulty lowered.");
else console.log("❌ FAIL: Difficulty not lowered.");


// Test 2: Boredom/Mastery Detection
console.log("\n--- Test 2: Mastery (3 fast correct answers) ---");
agent.reset(3); // Start at level 3
console.log(`Start Level: ${agent.getCurrentLevel()}`);

res = agent.recordResponse(true, 500); // Fast 1
console.log(`Response 1 (500ms): ${res.action}`);

res = agent.recordResponse(true, 600); // Fast 2
console.log(`Response 2 (600ms): ${res.action}`);

res = agent.recordResponse(true, 500); // Fast 3 (Window full)
console.log(`Response 3 (500ms): ${res.action} -> Level ${res.level} (${res.reason})`);

if (res.level === 4) console.log("✅ PASS: Difficulty increased.");
else console.log("❌ FAIL: Difficulty not increased.");


// Test 3: Flow State (Good accuracy, moderate speed)
console.log("\n--- Test 3: Flow State (Stable performance) ---");
agent.reset(5);
console.log(`Start Level: ${agent.getCurrentLevel()}`);

agent.recordResponse(true, 1500); // OK speed
agent.recordResponse(true, 1500); // OK speed
res = agent.recordResponse(true, 1500); // OK speed

console.log(`Result: ${res.action} -> Level ${res.level}`);

if (res.action === 'maintain') console.log("✅ PASS: Difficulty maintained.");
else console.log("❌ FAIL: Difficulty changed unexpectedly.");


// Test 4: Edge Case (Max Level)
console.log("\n--- Test 4: Max Level Cap ---");
agent.reset(10); // Max level
agent.recordResponse(true, 100);
agent.recordResponse(true, 100);
res = agent.recordResponse(true, 100); // Should try to increase

console.log(`Result: ${res.action} -> Level ${res.level} (${res.reason})`);
if (res.level === 10) console.log("✅ PASS: Level capped at 10.");
else console.log("❌ FAIL: Level exceeded max.");

console.log("\n📊 Analysis Complete.");
