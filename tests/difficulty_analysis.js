
// Analysis of current Difficulty Logic in app.js
// This script mocks the app state and tests the calculateInitialDifficulty function

class MockApp {
    constructor() {
        this.playerState = {
            gameStats: {}
        };
    }

    calculateInitialDifficulty(gameName) {
        const stats = this.playerState.gameStats[gameName];
        if (!stats) return 1;
        
        // Adaptive difficulty based on past performance
        const avgAccuracy = stats.avgAccuracy || 0;
        const gamesPlayed = stats.played || 0;
        
        if (avgAccuracy > 90 && gamesPlayed > 3) return Math.min(5, Math.floor(avgAccuracy / 20));
        if (avgAccuracy > 75 && gamesPlayed > 2) return 2;
        return 1;
    }
}

const app = new MockApp();
const gameName = "Pattern Blitz";

console.log("--- Difficulty Analysis Report ---");

// Case 1: New Player
console.log("\nCase 1: New Player (No stats)");
app.playerState.gameStats[gameName] = undefined;
console.log(`Input: stats=undefined`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);

// Case 2: Beginner
console.log("\nCase 2: Beginner (Low accuracy, few games)");
app.playerState.gameStats[gameName] = { played: 2, avgAccuracy: 60 };
console.log(`Input: played=2, avgAccuracy=60`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);

// Case 3: Intermediate
console.log("\nCase 3: Intermediate (Good accuracy, >2 games)");
app.playerState.gameStats[gameName] = { played: 3, avgAccuracy: 80 };
console.log(`Input: played=3, avgAccuracy=80`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);

// Case 4: Advanced
console.log("\nCase 4: Advanced (High accuracy, >3 games)");
app.playerState.gameStats[gameName] = { played: 4, avgAccuracy: 95 };
console.log(`Input: played=4, avgAccuracy=95`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);

// Case 5: Expert
console.log("\nCase 5: Expert (Perfect accuracy)");
app.playerState.gameStats[gameName] = { played: 10, avgAccuracy: 100 };
console.log(`Input: played=10, avgAccuracy=100`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);

// Edge Case: High accuracy but few games
console.log("\nEdge Case: Smurf (High accuracy, 1 game)");
app.playerState.gameStats[gameName] = { played: 1, avgAccuracy: 100 };
console.log(`Input: played=1, avgAccuracy=100`);
console.log(`Output: ${app.calculateInitialDifficulty(gameName)}`);
