
# 🤖 Agent System Documentation

The "Secret Sauce" of the ADHD Brain Arcade is its **Agent Layer**. These are not just simple scripts; they are designed to act as "co-regulators" for the ADHD brain.

## 1. 🎚️ Difficulty Dial (Adaptive Scaffolding)
**File:** `agents/DifficultyDial.js`

### Purpose
Prevents the two killers of ADHD engagement: **Boredom** (task too easy) and **Frustration** (task too hard).

### Logic
It uses a sliding window (N=5) to analyze player performance in real-time.

| Condition | Metric | Action | User Feedback |
| :--- | :--- | :--- | :--- |
| **Frustration** | 3 Consecutive Errors OR High Error Rate | **Decrease Difficulty** | "🛡️ Easing Off..." |
| **Mastery** | 100% Accuracy AND Avg Time < 600ms | **Increase Difficulty** | "🚀 Level Up!" |
| **Flow** | Consistent Accuracy & Moderate Speed | **Maintain Level** | (None) |

### Configuration
```javascript
new DifficultyDial({
    windowSize: 5,           // Rolling window
    boredomThresholdMs: 600, // Speed threshold for mastery
    frustrationThreshold: 3, // Error count for frustration
    minDifficulty: 1,
    maxDifficulty: 10
})
```

---

## 2. 🪙 Dopamine DJ (Reward System)
**File:** `agents/DopamineDJ.js`

### Purpose
Maintains engagement through a **Variable Ratio Reward Schedule**. It mimics the addictive nature of loot drops but applies it to healthy cognitive training.

### Logic
It tracks "Momentum" (speed + consistency) to adjust the probability of a reward drop.

1.  **Momentum Building:** Fast answers (<800ms) increase momentum (0-100). Errors decrease it.
2.  **Drop Calculation:** `Base Chance (15%)` + `Streak Bonus` + `Momentum Bonus`.
3.  **Reward Tiers:**
    *   🪙 **Standard:** 1 Coin (Common)
    *   🥈 **Silver:** 5 Coins (Uncommon - Streak > 5)
    *   💰 **Gold (Jackpot):** 10 Coins (Rare - Streak > 10 or Lucky Roll)

### Configuration
```javascript
new DopamineDJ({
    baseDropChance: 0.15,
    streakMultiplier: 0.05,
    maxDropChance: 0.80,
    coinValues: [1, 5, 10]
})
```

---

## 🔜 Upcoming Agents

### 🛡️ Hyperfocus Protector (State Agent)
*   **Goal:** Detect "Flow State" (rapid, rhythmic inputs).
*   **Action:** Automatically hide UI distractions (score, timer) and extend the session duration to let the user ride the wave.

### 👯 Body Double (Coach Agent)
*   **Goal:** Provide social reinforcement.
*   **Action:** Pop up between sessions with encouraging messages like "Nice one, BROski! Your working memory is leveling up."
