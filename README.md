# 🎯 Number Guessing Game

A modern, interactive web-based number guessing game with advanced features, beautiful UI, and comprehensive functionality.

## ✨ Features

### 🎮 Core Gameplay
- **Random Number Generation**: System generates a random number within selected difficulty range
- **Smart Feedback System**: Visual and text feedback for "Too high", "Too low", and "Correct" guesses
- **Attempt Tracking**: Real-time counter of number of attempts
- **Input Validation**: Comprehensive validation for numbers, ranges, and duplicate guesses

### 🚀 Advanced Features
- **3 Difficulty Levels**:
  - 🌱 Easy: 1-50
  - 🔥 Medium: 1-100  
  - ⚡ Hard: 1-500
- **Intelligent Hint System**: Up to 3 hints with proximity indicators
- **Scoring System**: Dynamic scoring based on attempts and hints used
- **Timer**: Track how long each game takes
- **Replay Options**: Play again or change difficulty
- **Persistent Leaderboard**: Top 10 scores saved locally for each difficulty

### 🎨 UI/UX Features
- **Modern Design**: Clean, gradient-based interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Visual Feedback**: Color-coded feedback messages and progress indicators
- **Progress Tracking**: Visual progress bar and proximity indicators
- **Micro-interactions**: Hover effects, transitions, and celebration animations
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Storage**: LocalStorage for leaderboard persistence
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Unicode emojis for universal compatibility

## 📁 Project Structure

```
number-guessing-game/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Game logic and state management
└── README.md           # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing!

### Alternative: Local Server
For optimal performance, run with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🎮 How to Play

1. **Select Difficulty**: Choose between Easy, Medium, or Hard
2. **Make Guesses**: Enter numbers and submit using Enter key or Guess button
3. **Use Hints**: Click "Get Hint" for proximity guidance (3 hints max)
4. **Track Progress**: Monitor attempts, time, and score in real-time
5. **Win**: Guess the correct number to see your results
6. **Leaderboard**: Your score is automatically saved if you make the top 10

## 📊 Scoring System

- **Starting Score**: 1000 points
- **Attempt Penalty**: -50 points per guess
- **Hint Penalty**: -100 points per hint used
- **Final Score**: Never goes below 0 points

## 🏆 Leaderboard

- **Per Difficulty**: Separate leaderboards for each difficulty level
- **Top 10**: Only the best 10 scores are saved
- **Persistent**: Scores survive browser restarts
- **Clear Option**: Reset all scores if desired

## 🎯 Edge Cases Handled

- ✅ Non-numeric input rejection
- ✅ Numbers outside range validation
- ✅ Duplicate guess detection
- ✅ Empty input handling
- ✅ Browser storage availability checks
- ✅ Timer accuracy across different devices
- ✅ Responsive design for all screen sizes

## 🔧 Customization

### Adding New Difficulty Levels
Edit the `difficulties` object in `script.js`:
```javascript
this.difficulties = {
    easy: { min: 1, max: 50, name: 'Easy' },
    medium: { min: 1, max: 100, name: 'Medium' },
    hard: { min: 1, max: 500, name: 'Hard' },
    expert: { min: 1, max: 1000, name: 'Expert' } // New difficulty
};
```

### Modifying Scoring
Adjust the scoring calculation in the `updateScore()` method:
```javascript
updateScore() {
    this.score = Math.max(0, 1000 - (this.attempts * 50) - (this.hintsUsed * 100));
}
```

### Customizing Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --error-color: #f44336;
}
```

## 🌟 Future Enhancements

- [ ] Multiplayer mode with turn-based gameplay
- [ ] AI-powered hint system with machine learning
- [ ] Sound effects and background music
- [ ] Dark/light theme toggle
- [ ] Mobile app version (PWA)
- [ ] Social media sharing of scores
- [ ] Achievement system
- [ ] Statistics dashboard
- [ ] Custom number ranges
- [ ] Tournament mode

## 🐛 Troubleshooting

### Common Issues

**Game doesn't start**
- Check browser console for errors
- Ensure all files are in the same directory
- Try refreshing the page

**Leaderboard not saving**
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Ensure no privacy extensions are blocking storage

**Styling issues**
- Verify CSS file is linked correctly
- Check for conflicting browser extensions
- Try different browser for testing

### Performance Tips

- Use a local web server for best performance
- Clear browser cache if experiencing issues
- Update to latest browser version

## 📱 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by classic number guessing games
- UI design inspired by modern web applications
- Thanks to the web development community for best practices

---

**Made with ❤️ for learning and fun!**

Enjoy playing the Number Guessing Game! 🎮
# Task-2-Prodgy
