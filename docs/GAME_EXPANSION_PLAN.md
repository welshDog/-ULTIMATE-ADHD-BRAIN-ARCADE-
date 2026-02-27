
# 🎮 Game Expansion Roadmap: Phase 1

## 🎯 Strategic Objective
Expand the micro-game library with high-impact cognitive training modules that target specific ADHD executive functions: **Inhibition** and **Working Memory**.

## 📊 Selection Criteria
1.  **Scientific Validity**: Based on proven cognitive tasks (Stroop, N-Back).
2.  **Dopamine Loop**: Must integrate with the Reward Agent (Variable rewards).
3.  **Flow State**: Mechanics must allow for "rhythmic" gameplay.
4.  **Accessibility**: Simple controls (Keyboard/Touch), clear visuals.

## 🚀 Prioritized Games

### 1. 🌈 Stroop Challenge (Inhibition)
*   **Concept**: The "Color Word" game.
*   **Mechanic**: A word (e.g., "RED") appears in a different ink color (e.g., Blue).
*   **Task**: Press the button matching the **INK COLOR**, ignoring the word.
*   **Cognitive Load**: Forces the brain to inhibit the automatic reading response.
*   **Difficulty Scaling**:
    *   Level 1: 3 Colors, Slow speed.
    *   Level 5: 6 Colors, Fast speed, moving text.
    *   Level 10: "Reverse Stroop" (Match the word, ignore the color) occasionally mixed in.

### 2. 🧠 Dual N-Back Lite (Working Memory)
*   **Concept**: Keeping track of past events.
*   **Mechanic**: A grid shows a flash. A voice says a letter.
*   **Task**:
    *   Press "Position" if the flash matches the one **N steps ago**.
    *   Press "Audio" if the letter matches the one **N steps ago**.
*   **Lite Version**: We will start with just **Visual N-Back** or **Audio N-Back** (Single channel) to reduce frustration, then upgrade to Dual.
*   **Difficulty Scaling**:
    *   Level 1: 1-Back (Match the previous one).
    *   Level 3: 2-Back.
    *   Level 5: 3-Back (The "Gold Standard" for fluid intelligence training).

## 🛠️ Technical Architecture
To prevent `app.js` bloat, new games will use a **Modular Game Interface**.

### Interface: `IGameModule`
```javascript
class GameModule {
    constructor(container, engine) { ... }
    init() { ... }       // Setup UI
    start() { ... }      // Begin loop
    stop() { ... }       // Cleanup
    handleInput(val) { ... } // Process user action
}
```

## 📅 Implementation Plan
1.  **Refactor**: Create `games/` directory.
2.  **Build**: `StroopChallenge.js` (Class-based).
3.  **Build**: `DualNBack.js` (Class-based).
4.  **Integrate**: Hook into `app.js` switch statements.
5.  **Polish**: Add Particle System effects to these new games.
