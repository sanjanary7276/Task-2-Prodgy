class NumberGuessingGame {
    constructor() {
        // Game State
        this.currentDifficulty = null;
        this.secretNumber = null;
        this.attempts = 0;
        this.score = 0;
        this.hintsUsed = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.gameActive = false;
        this.guessHistory = [];
        
        // Difficulty Settings
        this.difficulties = {
            easy: { min: 1, max: 50, name: 'Easy' },
            medium: { min: 1, max: 100, name: 'Medium' },
            hard: { min: 1, max: 500, name: 'Hard' }
        };
        
        // DOM Elements
        this.elements = {
            // Difficulty Section
            difficultySection: document.getElementById('difficultySection'),
            difficultyBtns: document.querySelectorAll('.difficulty-btn'),
            
            // Game Area
            gameArea: document.getElementById('gameArea'),
            attemptCount: document.getElementById('attemptCount'),
            timer: document.getElementById('timer'),
            score: document.getElementById('score'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            hintSection: document.getElementById('hintSection'),
            hintText: document.getElementById('hintText'),
            guessInput: document.getElementById('guessInput'),
            submitBtn: document.getElementById('submitBtn'),
            inputError: document.getElementById('inputError'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            
            // Control Buttons
            hintBtn: document.getElementById('hintBtn'),
            restartBtn: document.getElementById('restartBtn'),
            leaderboardBtn: document.getElementById('leaderboardBtn'),
            
            // Victory Screen
            victoryScreen: document.getElementById('victoryScreen'),
            correctNumber: document.getElementById('correctNumber'),
            finalAttempts: document.getElementById('finalAttempts'),
            finalTime: document.getElementById('finalTime'),
            finalScore: document.getElementById('finalScore'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            changeDifficultyBtn: document.getElementById('changeDifficultyBtn'),
            
            // Modal
            modalOverlay: document.getElementById('modalOverlay'),
            leaderboardModal: document.getElementById('leaderboardModal'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            tabBtns: document.querySelectorAll('.tab-btn'),
            leaderboardList: document.getElementById('leaderboardList'),
            clearScoresBtn: document.getElementById('clearScoresBtn')
        };
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.loadLeaderboardData();
    }
    
    attachEventListeners() {
        // Difficulty selection
        this.elements.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                this.startGame(difficulty);
            });
        });
        
        // Game input
        this.elements.submitBtn.addEventListener('click', () => this.makeGuess());
        this.elements.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
        
        // Control buttons
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        
        // Victory screen buttons
        this.elements.playAgainBtn.addEventListener('click', () => this.restartGame());
        this.elements.changeDifficultyBtn.addEventListener('click', () => this.changeDifficulty());
        
        // Modal controls
        this.elements.closeModalBtn.addEventListener('click', () => this.hideLeaderboard());
        this.elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.modalOverlay) this.hideLeaderboard();
        });
        
        // Leaderboard tabs
        this.elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.tab;
                this.switchLeaderboardTab(difficulty);
            });
        });
        
        // Clear scores
        this.elements.clearScoresBtn.addEventListener('click', () => this.clearAllScores());
        
        // Input validation
        this.elements.guessInput.addEventListener('input', () => this.clearInputError());
    }
    
    startGame(difficulty) {
        this.currentDifficulty = difficulty;
        const settings = this.difficulties[difficulty];
        
        // Generate secret number
        this.secretNumber = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
        
        // Reset game state
        this.attempts = 0;
        this.score = 1000; // Starting score
        this.hintsUsed = 0;
        this.guessHistory = [];
        this.gameActive = true;
        
        // Update UI
        this.elements.guessInput.max = settings.max;
        this.elements.guessInput.min = settings.min;
        this.elements.guessInput.placeholder = `Enter your guess (${settings.min}-${settings.max})`;
        
        // Show game area, hide difficulty section
        this.elements.difficultySection.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
        this.elements.victoryScreen.style.display = 'none';
        
        // Start timer
        this.startTimer();
        
        // Update displays
        this.updateStats();
        this.updateFeedback('Make your first guess!', '');
        this.clearInputError();
        
        // Focus input
        this.elements.guessInput.focus();
    }
    
    makeGuess() {
        if (!this.gameActive) return;
        
        const input = this.elements.guessInput;
        const guess = parseInt(input.value);
        const settings = this.difficulties[this.currentDifficulty];
        
        // Validate input
        if (!this.validateInput(guess, settings)) {
            return;
        }
        
        // Process guess
        this.attempts++;
        this.guessHistory.push(guess);
        this.updateScore();
        
        // Check guess
        if (guess === this.secretNumber) {
            this.handleWin();
        } else if (guess < this.secretNumber) {
            this.updateFeedback('Too low! 📉', 'too-low');
        } else {
            this.updateFeedback('Too high! 📈', 'too-high');
        }
        
        // Update UI
        this.updateStats();
        this.updateProgress();
        
        // Clear input
        input.value = '';
        input.focus();
    }
    
    validateInput(guess, settings) {
        this.clearInputError();
        
        // Check if input is a number
        if (isNaN(guess)) {
            this.showInputError('Please enter a valid number');
            return false;
        }
        
        // Check if within range
        if (guess < settings.min || guess > settings.max) {
            this.showInputError(`Please enter a number between ${settings.min} and ${settings.max}`);
            return false;
        }
        
        // Check if already guessed
        if (this.guessHistory.includes(guess)) {
            this.showInputError('You already guessed this number!');
            return false;
        }
        
        return true;
    }
    
    showInputError(message) {
        this.elements.inputError.textContent = message;
        this.elements.guessInput.style.borderColor = '#f44336';
    }
    
    clearInputError() {
        this.elements.inputError.textContent = '';
        this.elements.guessInput.style.borderColor = '#e0e0e0';
    }
    
    updateFeedback(message, className) {
        const feedbackEl = this.elements.feedbackMessage;
        feedbackEl.textContent = message;
        feedbackEl.className = 'feedback-message';
        if (className) {
            feedbackEl.classList.add(className);
        }
    }
    
    updateScore() {
        // Decrease score based on attempts and hints
        this.score = Math.max(0, 1000 - (this.attempts * 50) - (this.hintsUsed * 100));
    }
    
    updateStats() {
        this.elements.attemptCount.textContent = this.attempts;
        this.elements.score.textContent = this.score;
    }
    
    updateProgress() {
        const settings = this.difficulties[this.currentDifficulty];
        const range = settings.max - settings.min + 1;
        const progress = (this.guessHistory.length / Math.min(range, 20)) * 100; // Cap at 20 guesses for progress
        
        this.elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
        
        if (this.guessHistory.length === 0) {
            this.elements.progressText.textContent = 'No guesses yet';
        } else {
            const lastGuess = this.guessHistory[this.guessHistory.length - 1];
            const difference = Math.abs(lastGuess - this.secretNumber);
            let proximity = '';
            
            if (difference === 0) {
                proximity = 'Perfect! 🎯';
            } else if (difference <= 5) {
                proximity = 'Very close! 🔥';
            } else if (difference <= 15) {
                proximity = 'Getting warmer! 🌡️';
            } else if (difference <= 30) {
                proximity = 'Warm... 🌤️';
            } else {
                proximity = 'Cold... ❄️';
            }
            
            this.elements.progressText.textContent = `Last guess: ${lastGuess} - ${proximity}`;
        }
    }
    
    showHint() {
        if (!this.gameActive || this.hintsUsed >= 3) {
            if (this.hintsUsed >= 3) {
                this.updateFeedback('No more hints available!', '');
            }
            return;
        }
        
        this.hintsUsed++;
        this.updateScore();
        this.updateStats();
        
        const difference = Math.abs(this.guessHistory[this.guessHistory.length - 1] - this.secretNumber);
        let hint = '';
        
        if (difference <= 5) {
            hint = '🔥 You are very close! Within 5 numbers!';
        } else if (difference <= 15) {
            hint = '🌡️ Getting warmer! Within 15 numbers.';
        } else if (difference <= 30) {
            hint = '🌤️ Warm... but still quite far.';
        } else {
            hint = '❄️ Cold! You\'re far from the target.';
        }
        
        // Add directional hint
        const lastGuess = this.guessHistory[this.guessHistory.length - 1];
        if (lastGuess < this.secretNumber) {
            hint += ' Try higher! ⬆️';
        } else {
            hint += ' Try lower! ⬇️';
        }
        
        this.elements.hintText.textContent = hint;
        this.elements.hintSection.style.display = 'block';
        
        // Disable hint button if max hints reached
        if (this.hintsUsed >= 3) {
            this.elements.hintBtn.disabled = true;
            this.elements.hintBtn.textContent = '💡 No More Hints';
            this.elements.hintBtn.style.opacity = '0.5';
        }
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    handleWin() {
        this.gameActive = false;
        this.stopTimer();
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update victory screen
        this.elements.correctNumber.textContent = this.secretNumber;
        this.elements.finalAttempts.textContent = this.attempts;
        this.elements.finalTime.textContent = timeString;
        this.elements.finalScore.textContent = this.score;
        
        // Save to leaderboard
        this.saveToLeaderboard();
        
        // Show victory screen
        this.elements.gameArea.style.display = 'none';
        this.elements.victoryScreen.style.display = 'block';
        
        // Celebration animation
        this.celebrateWin();
    }
    
    celebrateWin() {
        // Add confetti or celebration effect here if desired
        const victoryContent = document.querySelector('.victory-content');
        victoryContent.style.animation = 'none';
        setTimeout(() => {
            victoryContent.style.animation = 'zoomIn 0.6s ease-out';
        }, 10);
    }
    
    restartGame() {
        // Reset UI
        this.elements.victoryScreen.style.display = 'none';
        this.elements.gameArea.style.display = 'none';
        this.elements.difficultySection.style.display = 'block';
        
        // Reset state
        this.gameActive = false;
        this.stopTimer();
        this.clearInputError();
        
        // Reset hint button
        this.elements.hintBtn.disabled = false;
        this.elements.hintBtn.textContent = '💡 Get Hint';
        this.elements.hintBtn.style.opacity = '1';
        this.elements.hintSection.style.display = 'none';
        
        // Clear input
        this.elements.guessInput.value = '';
    }
    
    changeDifficulty() {
        this.restartGame();
    }
    
    saveToLeaderboard() {
        const leaderboardKey = `leaderboard_${this.currentDifficulty}`;
        const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
        
        const entry = {
            score: this.score,
            attempts: this.attempts,
            time: Math.floor((Date.now() - this.startTime) / 1000),
            date: new Date().toISOString(),
            difficulty: this.currentDifficulty
        };
        
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 10 scores
        const topScores = leaderboard.slice(0, 10);
        localStorage.setItem(leaderboardKey, JSON.stringify(topScores));
    }
    
    loadLeaderboardData() {
        // Data is loaded on demand when showing leaderboard
    }
    
    showLeaderboard() {
        this.elements.modalOverlay.style.display = 'flex';
        this.switchLeaderboardTab('easy'); // Default to easy tab
    }
    
    hideLeaderboard() {
        this.elements.modalOverlay.style.display = 'none';
    }
    
    switchLeaderboardTab(difficulty) {
        // Update active tab
        this.elements.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === difficulty) {
                btn.classList.add('active');
            }
        });
        
        // Load and display leaderboard data
        const leaderboardKey = `leaderboard_${difficulty}`;
        const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
        
        this.displayLeaderboard(leaderboard);
    }
    
    displayLeaderboard(leaderboard) {
        const listEl = this.elements.leaderboardList;
        
        if (leaderboard.length === 0) {
            listEl.innerHTML = '<div class="no-scores">No scores yet. Be the first to play!</div>';
            return;
        }
        
        listEl.innerHTML = leaderboard.map((entry, index) => {
            const rank = index + 1;
            let rankClass = '';
            let rankIcon = '';
            
            if (rank === 1) {
                rankClass = 'gold';
                rankIcon = '🥇';
            } else if (rank === 2) {
                rankClass = 'silver';
                rankIcon = '🥈';
            } else if (rank === 3) {
                rankClass = 'bronze';
                rankIcon = '🥉';
            } else {
                rankIcon = `#${rank}`;
            }
            
            const minutes = Math.floor(entry.time / 60);
            const seconds = entry.time % 60;
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            return `
                <div class="leaderboard-entry ${rankClass}">
                    <div class="leaderboard-rank">${rankIcon}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-score">${entry.score} points</div>
                        <div class="leaderboard-details">
                            ${entry.attempts} attempts • ${timeString} • ${new Date(entry.date).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    clearAllScores() {
        if (confirm('Are you sure you want to clear all scores from all difficulties? This cannot be undone.')) {
            Object.keys(this.difficulties).forEach(difficulty => {
                localStorage.removeItem(`leaderboard_${difficulty}`);
            });
            
            // Refresh current tab
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                this.switchLeaderboardTab(activeTab.dataset.tab);
            }
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NumberGuessingGame();
});

// Add some extra utility functions
function addConfetti() {
    // Simple confetti effect (could be enhanced)
    const colors = ['#667eea', '#764ba2', '#4caf50', '#ff9800', '#f44336'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random() * 0.8 + 0.2};
            transform: rotate(${Math.random() * 360}deg);
            animation: fall ${Math.random() * 3 + 2}s ease-out forwards;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .no-scores {
        text-align: center;
        padding: 40px 20px;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style);
