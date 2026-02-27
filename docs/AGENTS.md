
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

---

## 3. 🛡️ Hyperfocus Protector (State Agent)
**File:** `agents/HyperfocusProtector.js`

### Purpose
Detects when the user has entered a "Flow State" (Hyperfocus) and actively modifies the environment to sustain it.

### Logic
It analyzes the **Variance** of response times. Low variance indicates rhythmic, automatic processing (Flow).

*   **Enter Flow:** High Accuracy + Low Latency Variance (< 250ms deviation).
    *   **Action:** Dims UI distractions (Score, Timer), hides Navigation.
*   **Exit Flow (Natural):** Variance increases or speed drops.
    *   **Action:** Restore UI.
*   **Exit Flow (Error):** Streak broken.
    *   **Action:** Trigger **Graceful Recovery Mode** (Breathing exercise) instead of "Game Over".

---

## 🔜 Upcoming Agents

### 👯 Body Double (Coach Agent)
*   **Goal:** Provide social reinforcement.
*   **Action:** Pop up between sessions with encouraging messages like "Nice one, BROski! Your working memory is leveling up."
