
/**
 * 🧠 Dual N-Back Lite Game Module
 * 
 * Cognitive Skill: Working Memory
 * The player must remember positions from N steps ago.
 * "Lite" version focuses on Visual N-Back first to reduce frustration.
 */

class DualNBack {
    constructor(container, engine) {
        this.container = container;
        this.engine = engine;
        this.nLevel = 1; // 1-Back, 2-Back, etc.
        this.gridSize = 3; // 3x3 grid
        this.history = []; // Stores past positions
        this.roundCount = 0;
        this.active = false;
        this.timer = null;
        this.currentPosition = null;
    }

    init() {
        this.nLevel = Math.max(1, Math.floor(this.engine.currentSession.difficulty / 2)); // Scale N with difficulty
        
        this.container.innerHTML = `
            <div class="nback-game" style="text-align: center;">
                <h3>🧠 N-Back Challenge</h3>
                <p>Match the <strong>${this.nLevel}-BACK</strong> position!</p>
                <p style="font-size: 0.9em; opacity: 0.8;">Does this match what you saw ${this.nLevel} turns ago?</p>
                
                <div id="nback-grid" style="
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 10px; 
                    width: 300px; 
                    height: 300px; 
                    margin: 20px auto;
                    background: #222;
                    padding: 10px;
                    border-radius: 10px;
                ">
                    ${Array(9).fill('<div class="grid-cell" style="background: #333; border-radius: 5px; transition: background 0.2s;"></div>').join('')}
                </div>

                <div class="controls" style="margin-top: 20px;">
                    <button id="btn-match" class="btn btn--primary" style="width: 200px; font-size: 1.2rem;">
                        🎯 MATCH!
                    </button>
                </div>
                
                <div id="nback-indicator" style="margin-top: 10px; height: 20px; font-weight: bold;"></div>
            </div>
        `;

        document.getElementById('btn-match').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleMatchClaim();
        });
    }

    start() {
        this.active = true;
        this.history = [];
        this.roundCount = 0;
        this.gameLoop();
    }

    stop() {
        this.active = false;
        if (this.timer) clearTimeout(this.timer);
    }

    gameLoop() {
        if (!this.active) return;

        // 1. Determine Next Position
        // 30% chance of being a match
        let nextPos;
        const targetIndex = this.history.length - this.nLevel;
        const shouldMatch = Math.random() < 0.3 && targetIndex >= 0;

        if (shouldMatch) {
            nextPos = this.history[targetIndex].position;
        } else {
            nextPos = Math.floor(Math.random() * 9);
            // Avoid accidental match
            if (targetIndex >= 0 && nextPos === this.history[targetIndex].position) {
                nextPos = (nextPos + 1) % 9;
            }
        }

        this.currentPosition = nextPos;
        this.currentRoundStart = Date.now();
        this.playerResponded = false; // Reset response flag

        // 2. Add to history
        this.history.push({
            position: nextPos,
            isMatch: shouldMatch, // Truth
            round: this.roundCount
        });

        // 3. Render
        this.flashCell(nextPos);

        // 4. Schedule next turn
        // Speed increases with difficulty (2500ms -> 1500ms)
        const speed = Math.max(1500, 3000 - (this.engine.currentSession.difficulty * 200));
        
        this.timer = setTimeout(() => {
            this.evaluateNonResponse();
            this.roundCount++;
            this.gameLoop();
        }, speed);
    }

    flashCell(index) {
        const cells = document.querySelectorAll('.grid-cell');
        if (cells[index]) {
            cells[index].style.background = 'var(--color-primary)';
            cells[index].style.boxShadow = '0 0 15px var(--color-primary)';
            
            setTimeout(() => {
                if (cells[index]) {
                    cells[index].style.background = '#333';
                    cells[index].style.boxShadow = 'none';
                }
            }, 800);
        }
    }

    handleMatchClaim() {
        if (!this.active || this.playerResponded) return;
        this.playerResponded = true;

        const currentTurn = this.history[this.history.length - 1];
        // We are checking if CURRENT matches N-BACK
        // Actually, in N-Back, you press match WHEN the stimulus appears.
        
        if (currentTurn.isMatch) {
            // Correct Match!
            this.engine.showFeedback('Target Acquired!', 'success');
            this.engine.addScore(150); // High reward for N-Back
            this.engine.recordResponse(true, Date.now() - this.currentRoundStart);
            
            // Visual feedback
            const indicator = document.getElementById('nback-indicator');
            if (indicator) {
                indicator.textContent = "MATCH CONFIRMED";
                indicator.style.color = "var(--color-success)";
            }
        } else {
            // False Alarm
            this.engine.showFeedback('False Alarm', 'error');
            this.engine.recordResponse(false, Date.now() - this.currentRoundStart);
            this.engine.addMistake('Pressed Match when there was none');
        }
    }

    evaluateNonResponse() {
        if (!this.playerResponded) {
            const currentTurn = this.history[this.history.length - 1];
            if (currentTurn.isMatch) {
                // Missed Opportunity
                this.engine.showFeedback('Missed Match!', 'warning');
                this.engine.recordResponse(false, 2000); // Penalty time
                this.engine.addMistake('Missed a valid match');
            } else {
                // Correct Rejection (Did nothing when no match)
                // In N-Back, silence is golden only if it wasn't a match
                // We usually give small points for correct rejection or just don't penalize
                // Let's give a tiny streak bump
                this.engine.recordResponse(true, 0); // 0ms = passive correct
            }
        }
        
        const indicator = document.getElementById('nback-indicator');
        if (indicator) indicator.textContent = "";
    }
}

// Export
if (typeof window !== 'undefined') {
    window.DualNBack = DualNBack;
}
if (typeof module !== 'undefined') {
    module.exports = DualNBack;
}
