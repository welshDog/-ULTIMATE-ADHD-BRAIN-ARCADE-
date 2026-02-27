
/**
 * 🛡️ Hyperfocus Protector Agent
 * 
 * "The Bouncer for Your Brain"
 * 
 * Responsibilities:
 * 1. Detect "Flow State" (Rhythmic, high-speed, high-accuracy performance).
 * 2. Protect Flow: Hide non-essential UI (timers, scores) when in the zone.
 * 3. Gentle Recovery: If flow breaks (error streak), gently guide back without shame.
 */

class HyperfocusProtector {
    constructor(config = {}) {
        this.config = {
            flowThreshold: {
                streak: 5,
                avgTime: 1200, // ms
                variance: 200  // ms (low variance = rhythm)
            },
            ...config
        };

        this.state = {
            isFlowing: false,
            responseHistory: [], // Last 10 responses {time, isCorrect}
            startTime: 0
        };
    }

    reset() {
        this.state.isFlowing = false;
        this.state.responseHistory = [];
        this.state.startTime = Date.now();
    }

    recordResponse(isCorrect, timeMs) {
        this.state.responseHistory.push({ isCorrect, timeMs });
        if (this.state.responseHistory.length > 10) {
            this.state.responseHistory.shift();
        }

        return this.analyzeFlow();
    }

    analyzeFlow() {
        if (this.state.responseHistory.length < 5) return { flow: false };

        const recent = this.state.responseHistory;
        const allCorrect = recent.every(r => r.isCorrect);
        
        // Calculate rhythm (standard deviation of time)
        const times = recent.map(r => r.timeMs);
        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        const variance = Math.sqrt(times.map(t => Math.pow(t - avgTime, 2)).reduce((a, b) => a + b, 0) / times.length);

        // Flow Condition: High Accuracy + Rhythmic Speed
        const isFlowingNow = allCorrect && variance < this.config.flowThreshold.variance && avgTime < 2000;

        if (isFlowingNow && !this.state.isFlowing) {
            this.state.isFlowing = true;
            return { flow: true, action: 'enter_flow', message: '🌊 Flow State Detected' };
        } else if (!isFlowingNow && this.state.isFlowing) {
            this.state.isFlowing = false;
            return { flow: false, action: 'exit_flow', message: '⚓ Flow Broken' };
        }

        return { flow: this.state.isFlowing, action: 'maintain' };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HyperfocusProtector;
} else {
    window.HyperfocusProtector = HyperfocusProtector;
}
