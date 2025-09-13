// src/components/PomodoroTimer.js

/**
 * Class representing a Pomodoro Timer
 */
class PomodoroTimer {
  // Timer constants
  static WORK_TIME = 25 * 60; // 25 minutes in seconds
  static BREAK_TIME = 5 * 60; // 5 minutes in seconds
  static UPDATE_INTERVAL = 1000; // 1 second

  /**
   * Create a pomodoro timer
   * @param {HTMLElement} displayElement - Element to display the timer
   */
  constructor(displayElement) {
    if (!displayElement) {
      throw new Error('Display element is required');
    }

    this.displayElement = displayElement;
    this.isRunning = false;
    this.timeLeft = PomodoroTimer.WORK_TIME;
    this.isBreak = false;
    this.intervalId = null;

    // Initial display
    this.displayTime(this.timeLeft);
  }

  /**
   * Formats and displays time
   * @param {number} seconds - Time in seconds to display
   */
  displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    this.displayElement.textContent = 
      `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Starts the timer
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.displayTime(this.timeLeft);
      } else {
        this.reset();
        this.toggleMode();
      }
    }, PomodoroTimer.UPDATE_INTERVAL);
  }

  /**
   * Pauses the timer
   */
  pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Resets the timer
   */
  reset() {
    this.pause();
    this.timeLeft = this.isBreak ? PomodoroTimer.BREAK_TIME : PomodoroTimer.WORK_TIME;
    this.displayTime(this.timeLeft);
  }

  /**
   * Toggles between work and break modes
   */
  toggleMode() {
    this.isBreak = !this.isBreak;
    this.timeLeft = this.isBreak ? PomodoroTimer.BREAK_TIME : PomodoroTimer.WORK_TIME;
    this.displayTime(this.timeLeft);
    
    const mode = this.isBreak ? 'Break' : 'Work';
    console.log(`Switching to ${mode} Mode`);
  }

  /**
   * Returns bound methods for external use
   */
  importToMain() {
    return {
      start: this.start.bind(this),
      pause: this.pause.bind(this),
      reset: this.reset.bind(this),
      toggleMode: this.toggleMode.bind(this),
      displayElement: this.displayElement
    };
  }
}

export default PomodoroTimer;