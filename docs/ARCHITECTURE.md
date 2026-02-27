
# 🏗️ Architecture & System Design

## Overview
The **Ultimate ADHD Brain Arcade** is a lightweight, zero-dependency web application designed to train cognitive skills through gamified engagement. It uses an **Agent-Based Architecture** where autonomous agents monitor player behavior and co-regulate the experience in real-time.

## 🧱 Core Components

### 1. The Game Hub (`index.html`)
The central entry point that handles:
*   **Energy Level Selection:** Users self-report energy (Low/Medium/High).
*   **Category Navigation:** Focus Primers, Attention Switchers, Flow Finders, Break Boosters.
*   **Stats Dashboard:** Displays Level, XP, Streak, and Coin Wallet.
*   **Agent Initialization:** Loads `DifficultyDial.js` and `DopamineDJ.js`.

### 2. The Monolith Engine (`app.js`)
Currently acts as the central controller:
*   **Game State Management:** Tracks current session, scores, and timers.
*   **UI Rendering:** Dynamic DOM manipulation for game screens.
*   **Game Logic:** Contains the implementation of all 16 micro-games.
*   **Agent Orchestration:** Feeds data to agents and executes their decisions.

### 3. The Agent Layer (`/agents`)
Autonomous modules that run in the background:
*   **DifficultyDial:** Monitors performance (accuracy/speed) to adjust difficulty.
*   **DopamineDJ:** Monitors momentum to trigger variable rewards.

## 🔄 Data Flow

```mermaid
graph TD
    User[User Action] -->|Click/Keypress| App[app.js]
    App -->|Record Response| Agent1[DifficultyDial Agent]
    App -->|Record Response| Agent2[DopamineDJ Agent]
    
    Agent1 -->|Analysis Result| App
    Agent2 -->|Reward Payload| App
    
    App -->|Update UI| DOM[DOM / Screen]
    App -->|Play Sound| Audio[Web Audio API]
```

## 📂 Directory Structure

```
/
├── index.html          # Main entry point
├── style.css           # Global styles & animations
├── app.js              # Core game engine
├── agents/             # Intelligent Agents
│   ├── DifficultyDial.js   # Adaptive Scaffolding
│   └── DopamineDJ.js       # Reward System
├── tests/              # Unit Tests
│   ├── test_difficulty_dial.js
│   └── test_dopamine_dj.js
└── noters/             # Design documentation
```

## 🛠️ Technology Stack
*   **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3.
*   **State Management:** In-memory objects (`playerState`, `currentSession`).
*   **Audio:** Native Web Audio API (Oscillators).
*   **Storage:** LocalStorage (Planned for persistence).
*   **Testing:** Node.js based unit tests.

## 🚀 Future Roadmap
1.  **Modularization:** Split `app.js` into `GameEngine.js`, `UIManager.js`, and individual game files.
2.  **Persistence:** Save player progress to `localStorage` or a backend DB.
3.  **New Agents:** Implement `HyperfocusProtector` (Flow State) and `BodyDouble` (Coach).
