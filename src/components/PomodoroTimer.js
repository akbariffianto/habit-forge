// src/components/PomodoroTimer.js (Diperbaiki)

class PomodoroTimer {
  // Time constants in seconds
  static WORK_TIME = 25 * 60;
  static BREAK_TIME = 5 * 60;
  static UPDATE_INTERVAL = 1000;

  /**
   * Create a pomodoro timer
   * @param {HTMLElement} displayElement - Element to display the timer
   * @param {Function} onCompleteCallback - Fungsi yang dipanggil saat timer selesai
   */
  constructor(displayElement, onCompleteCallback) { // <-- Tambahkan parameter kedua
    if (!displayElement) {
      throw new Error('Display element is required');
    }

    this.displayElement = displayElement;
    this.isRunning = false;
    this.timeLeft = PomodoroTimer.WORK_TIME;
    this.isBreak = false;
    this.intervalId = null;
    this.onComplete = onCompleteCallback; // <-- Simpan callback

    // Ganti path ini jika perlu
    this.notificationSound = new Audio('/assets/audio/complete.mp3'); 

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
        // ... (logika notifikasi suara tetap sama)
        const playPromise = this.notificationSound.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Gagal memutar audio:", error);
            alert("Sesi Selesai!"); 
          });
        }
        
        this.reset();
        this.toggleMode();

        // --- PERUBAHAN INTI: Panggil callback di sini ---
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }, PomodoroTimer.UPDATE_INTERVAL);
  }

  /**
   * Pause the timer
   */
  pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  /**
   * Reset the timer to the initial state
   */
  reset() {
    this.pause();
    this.timeLeft = this.isBreak ? PomodoroTimer.BREAK_TIME : PomodoroTimer.WORK_TIME;
    this.displayTime(this.timeLeft);
  }

  /**
   * Toggle between work and break mode
   */
  toggleMode() {
    this.isBreak = !this.isBreak;
    this.timeLeft = this.isBreak ? PomodoroTimer.BREAK_TIME : PomodoroTimer.WORK_TIME;
    this.displayTime(this.timeLeft);

    const mode = this.isBreak ? 'Break' : 'Work';
    console.log(`Switching to ${mode} Mode`);
  }
  
  /**
   * Import methods to main application
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