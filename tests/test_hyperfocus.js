
// Test Suite for HyperfocusProtector
const HyperfocusProtector = require('../agents/HyperfocusProtector');

const agent = new HyperfocusProtector();

console.log("🛡️ Starting Hyperfocus Analysis...\n");

// Test 1: Enter Flow
console.log("--- Test 1: Entering Flow ---");
agent.reset();
// Simulate rhythmic, correct responses (1000ms +/- 50ms)
for (let i = 0; i < 5; i++) {
    const res = agent.recordResponse(true, 1000 + (Math.random() * 50 - 25));
    console.log(`Response ${i+1}: ${res.action}`);
}
// The 6th should trigger flow (window full enough)
const flowRes = agent.recordResponse(true, 1000);
console.log(`Trigger: ${flowRes.action}`);

if (flowRes.flow) console.log("✅ PASS: Entered Flow State");
else console.log("❌ FAIL: Did not detect flow");


// Test 2: Break Flow (Error)
console.log("\n--- Test 2: Breaking Flow (Error) ---");
const breakRes = agent.recordResponse(false, 1000); // Error!
console.log(`Error Response: ${breakRes.action}`);

if (!breakRes.flow) console.log("✅ PASS: Exited Flow State on Error");
else console.log("❌ FAIL: Flow persisted despite error");


// Test 3: Erratic Speed (No Flow)
console.log("\n--- Test 3: Erratic Speed (No Flow) ---");
agent.reset();
agent.recordResponse(true, 500);
agent.recordResponse(true, 2000);
agent.recordResponse(true, 500);
agent.recordResponse(true, 2000);
const erraticRes = agent.recordResponse(true, 500);

if (!erraticRes.flow) console.log("✅ PASS: Variance too high for flow");
else console.log("❌ FAIL: Erratic speed triggered flow");

console.log("\n🛡️ Agent Analysis Complete.");
