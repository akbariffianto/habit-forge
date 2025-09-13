/**
 * Class representing the gamification system
 */
class Gamification {
  constructor() {
    this.LEVEL_UP_EXP_THRESHOLD = 100;
    this.BASE_EXP_REWARD = 100;
    this.STORAGE_KEY = 'userProgress';
    
    // Initialize progress if not exists
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      this.initializeProgress();
    }
  }

  /**
   * Calculates base experience points for completed habits
   * @returns {number} Base experience points
   */
  calculateExp() {
    return this.BASE_EXP_REWARD;
  }

  /**
   * Gets current user progress
   * @returns {Object} User progress data
   */
  getUserProgress() {
    try {
      const progress = localStorage.getItem(this.STORAGE_KEY);
      return progress ? JSON.parse(progress) : this.initializeProgress();
    } catch (error) {
      console.error('Error loading user progress:', error);
      return this.initializeProgress();
    }
  }

  /**
   * Saves user progress
   * @param {Object} progress - Progress data to save
   */
  saveUserProgress(progress) {
    if (!this.isValidProgress(progress)) {
      console.error('Invalid progress object');
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  /**
   * Initializes default progress
   * @private
   * @returns {Object} Default progress object
   */
  initializeProgress() {
    return {
      level: 1,
      exp: 0,
      achievements: []
    };
  }

  /**
   * Validates progress object
   * @private
   * @param {Object} progress - Progress object to validate
   * @returns {boolean} Whether progress object is valid
   */
  isValidProgress(progress) {
    return (
      progress &&
      typeof progress.level === 'number' &&
      typeof progress.exp === 'number' &&
      Array.isArray(progress.achievements)
    );
  }
}

export default Gamification;