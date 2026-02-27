
/**
 * 🌈 Stroop Challenge Game Module
 * 
 * Cognitive Skill: Inhibition / Response Control
 * The player must select the INK COLOR, not the word.
 */

class StroopChallenge {
    constructor(container, engine) {
        this.container = container;
        this.engine = engine; // Reference to main app for scoring/audio
        this.colors = [
            { name: 'RED', hex: '#FF0000' },
            { name: 'BLUE', hex: '#0000FF' },
            { name: 'GREEN', hex: '#00FF00' },
            { name: 'YELLOW', hex: '#FFFF00' },
            { name: 'PURPLE', hex: '#800080' }
        ];
        this.active = false;
        this.currentRound = null;
    }

    init() {
        this.container.innerHTML = `
            <div class="stroop-game" style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                <h3>🌈 Stroop Challenge</h3>
                <p>Click the button matching the <strong>INK COLOR</strong>!</p>
                
                <div id="stroop-word" style="font-size: 4rem; font-weight: bold; margin: 40px 0; min-height: 80px; transition: transform 0.1s;">
                    READY?
                </div>

                <div id="stroop-controls" class="stroop-controls" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 400px; margin: 0 auto;">
                    <!-- Buttons generated dynamically -->
                </div>
            </div>
        `;
        
        this.renderControls();
    }

    renderControls() {
        const controls = document.getElementById('stroop-controls');
        controls.innerHTML = '';
        
        // Difficulty check: Level 1-2 (3 colors), 3-4 (4 colors), 5+ (5 colors)
        const difficulty = this.engine.currentSession.difficulty;
        const colorCount = Math.min(this.colors.length, 3 + Math.floor((difficulty - 1) / 2));
        const activeColors = this.colors.slice(0, colorCount);

        activeColors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.backgroundColor = color.hex;
            btn.style.color = '#fff'; // White text for contrast
            btn.style.border = '2px solid #fff';
            btn.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
            btn.textContent = color.name;
            btn.dataset.color = color.name;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleInput(color.name);
            });
            
            controls.appendChild(btn);
        });
    }

    start() {
        this.active = true;
        this.nextRound();
    }

    stop() {
        this.active = false;
    }

    nextRound() {
        if (!this.active) return;

        const wordEl = document.getElementById('stroop-word');
        
        // Difficulty scaling
        const difficulty = this.engine.currentSession.difficulty;
        const colorCount = Math.min(this.colors.length, 3 + Math.floor((difficulty - 1) / 2));
        const activeColors = this.colors.slice(0, colorCount);

        // 1. Pick a word (e.g., "RED")
        const wordObj = activeColors[Math.floor(Math.random() * activeColors.length)];
        
        // 2. Pick an ink color (e.g., Blue Hex)
        // High difficulty = higher chance of mismatch
        // Low difficulty = sometimes match (congruent) to keep them on toes? 
        // Actually Stroop is about conflict. We want mismatch mostly.
        let colorObj = activeColors[Math.floor(Math.random() * activeColors.length)];
        
        // Ensure mismatch 70% of the time for maximum interference
        if (Math.random() > 0.3 && colorObj === wordObj) {
            const others = activeColors.filter(c => c !== wordObj);
            colorObj = others[Math.floor(Math.random() * others.length)];
        }

        this.currentRound = {
            target: colorObj.name, // The answer is the INK COLOR
            distractor: wordObj.name,
            startTime: Date.now()
        };

        // Animate
        wordEl.style.transform = 'scale(0.5)';
        wordEl.style.opacity = '0';
        
        setTimeout(() => {
            wordEl.textContent = wordObj.name;
            wordEl.style.color = colorObj.hex;
            wordEl.style.transform = 'scale(1)';
            wordEl.style.opacity = '1';
        }, 100);
    }

    handleInput(selectedColorName) {
        if (!this.active || !this.currentRound) return;

        const isCorrect = selectedColorName === this.currentRound.target;
        const responseTime = Date.now() - this.currentRound.startTime;

        // Feedback
        const wordEl = document.getElementById('stroop-word');
        if (isCorrect) {
            wordEl.textContent = '✓';
            wordEl.style.color = 'var(--color-success)';
            this.engine.addScore(100);
            this.engine.showFeedback('Nice!', 'success');
        } else {
            wordEl.textContent = '✗';
            wordEl.style.color = 'var(--color-error)';
            this.engine.addMistake(`Stroop Error: Picked ${selectedColorName} instead of ${this.currentRound.target}`);
            this.engine.showFeedback('Focus on Color!', 'error');
        }

        // Report to engine
        this.engine.recordResponse(isCorrect, responseTime);

        // Next round delay
        setTimeout(() => this.nextRound(), isCorrect ? 400 : 800);
    }
}

// Export to window
if (typeof window !== 'undefined') {
    window.StroopChallenge = StroopChallenge;
}
if (typeof module !== 'undefined') {
    module.exports = StroopChallenge;
}
