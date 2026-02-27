
# 🧠 ULTIMATE ADHD BRAIN ARCADE 🕹️

> **"A video game that plays your brain while you play it."**

The **Ultimate ADHD Brain Arcade** is a cognitive training platform specifically engineered for the neurodivergent brain. It uses **Bi-Directional Scaffolding** and **Autonomous Agents** to co-regulate the user's attention, motivation, and frustration levels in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 🌟 Key Features

*   **⚡ Focus Primers:** Quick visual games to jumpstart dopamine.
*   **⚙️ Attention Switchers:** Train cognitive flexibility.
*   **🤖 Smart Agents:**
    *   **Difficulty Dial:** Adjusts difficulty instantly if you get bored or frustrated.
    *   **Dopamine DJ:** Drops coins and rewards based on your momentum.
*   **🪙 Gamified Economy:** Earn BROski$ coins, unlock achievements, and level up.
*   **🔋 Energy-Based Recommendations:** Suggests games based on whether you feel Low, Medium, or High energy.

## 🚀 Getting Started

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).
*   No installation required for players!

### Installation (Developers)
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ultimate-adhd-brain-arcade.git
    cd ultimate-adhd-brain-arcade
    ```

2.  **Run Locally:**
    Since this is a vanilla JS app, you can just open `index.html` in your browser.
    
    OR, for a better experience (hot reloading), use a local server:
    ```bash
    # Python
    python -m http.server 8000
    
    # Node.js (http-server)
    npx http-server .
    ```

3.  **Run Tests:**
    We use Node.js for testing the agent logic.
    ```bash
    node tests/test_difficulty_dial.js
    node tests/test_dopamine_dj.js
    ```

## 🎮 How to Play

1.  **Select Your Energy:** Tell the arcade how you're feeling (Low/Medium/High).
2.  **Choose a Category:** Pick a game type (e.g., Focus Primers).
3.  **Play:**
    *   **Pattern Blitz:** Find the odd shape out.
    *   **Color Cascade:** Remember the sequence.
    *   **Number Rush:** Speed math.
4.  **Watch the Agents Work:**
    *   If you're too fast, the game speeds up (🚀 Level Up!).
    *   If you struggle, it slows down (🛡️ Easing Off...).
    *   Keep your streak up to earn **Jackpot Coins**!

## 📂 Documentation

*   **[Architecture Overview](docs/ARCHITECTURE.md):** System design and data flow.
*   **[Agent Systems](docs/AGENTS.md):** Deep dive into the AI logic.
*   **[Analysis Report](ANALYSIS_REPORT.md):** Technical analysis of the difficulty logic.

## 🤝 Contributing

We welcome contributions from fellow neurodivergent devs!

1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/NewGame`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ and Hyperfocus.*
