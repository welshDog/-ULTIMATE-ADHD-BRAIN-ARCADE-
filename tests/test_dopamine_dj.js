
// Test Suite for DopamineDJ (Reward Agent)
const DopamineDJ = require('../agents/DopamineDJ');

const agent = new DopamineDJ({
    baseDropChance: 0.2, // Higher base for testing
    streakMultiplier: 0.1
});

console.log("🪙 Starting DopamineDJ Economy Test...\n");

// Test 1: Initialization
agent.initializeSession(100);
console.log(`Initial Wallet: ${agent.getWalletBalance()} (Expected: 100)`);
if (agent.getWalletBalance() === 100) console.log("✅ PASS: Initialization");
else console.log("❌ FAIL: Initialization");

// Test 2: Basic Drop Logic (Statistical check)
console.log("\n--- Test 2: Drop Probability (100 trials) ---");
let drops = 0;
let totalEarned = 0;

for (let i = 0; i < 100; i++) {
    // Simulate correct answer, 1000ms, streak 0
    const res = agent.processResponse(true, 1000, 0);
    if (res.drop) {
        drops++;
        totalEarned += res.amount;
    }
}

console.log(`Drops: ${drops}/100`);
console.log(`Total Earned: ${totalEarned}`);
// Expect roughly 20 drops (+/- variance)
if (drops > 5 && drops < 40) console.log("✅ PASS: Drop rate within reasonable bounds");
else console.log("❌ FAIL: Drop rate suspicious");


// Test 3: Momentum Building
console.log("\n--- Test 3: Momentum & High Streak ---");
agent.initializeSession(0);
// Simulate "Zone" performance: Fast answers, High Streak
let highStreakDrops = 0;
for (let i = 0; i < 20; i++) {
    const res = agent.processResponse(true, 500, i); // Fast (500ms), Increasing Streak
    if (res.drop) {
        highStreakDrops++;
        console.log(`Drop at Streak ${i}: ${res.message}`);
    }
}

console.log(`High Momentum Drops: ${highStreakDrops}/20`);
if (highStreakDrops > 5) console.log("✅ PASS: High momentum yields more rewards");
else console.log("❌ FAIL: Momentum didn't trigger enough drops");


// Test 4: Jackpot Logic
console.log("\n--- Test 4: Jackpot Trigger ---");
// Force a jackpot check by running high streak
let jackpotFound = false;
for (let i = 0; i < 50; i++) {
    const res = agent.processResponse(true, 400, 15); // Streak 15
    if (res.drop && res.amount >= 10) {
        jackpotFound = true;
        console.log(`JACKPOT HIT! ${res.message}`);
        break;
    }
}

if (jackpotFound) console.log("✅ PASS: Jackpot mechanics working");
else console.log("⚠️ WARN: No jackpot in 50 tries (statistically possible but rare)");

console.log("\n💰 Final Wallet: " + agent.getWalletBalance());
