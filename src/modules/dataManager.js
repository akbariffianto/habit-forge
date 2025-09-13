/**
 * Constants for local storage keys
 */
const STORAGE_KEYS = {
  HABITS: "habitForgeData",
  PROGRESS: "habitForgeProgress",
};

class DataManager {
  constructor() {
    this.data = this.loadHabits();
  }

  /**
   * Saves habits to local storage
   * @param {Array} habits - Array of habit objects
   * @throws {Error} If habits parameter is invalid
   */
  saveHabits(habits) {
    if (!Array.isArray(habits)) {
      throw new Error("Habits must be an array");
    }

    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
      this.data = habits;
    } catch (error) {
      console.error("Failed to save habits:", error);
      throw new Error("Failed to save habits to storage");
    }
  }

  /**
   * Loads habits from local storage
   * @returns {Array} Array of habit objects
   */
  loadHabits() {
    try {
      const storedData = localStorage.getItem(STORAGE_KEYS.HABITS);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to load habits:", error);
      return [];
    }
  }

  /**
   * Adds a new habit
   * @param {Object} habit - Habit object to add
   * @throws {Error} If habit is invalid
   */
  addHabit(habit) {
    if (!this.isValidHabit(habit)) {
      throw new Error("Invalid habit object");
    }

    try {
      this.data.push(habit);
      this.saveHabits(this.data);
    } catch (error) {
      console.error("Failed to add habit:", error);
      throw new Error("Failed to add habit");
    }
  }

  /**
   * Updates an existing habit
   * @param {Object} habit - Updated habit object
   * @returns {boolean} Whether update was successful
   */
  updateHabit(habit) {
    if (!this.isValidHabit(habit)) {
      throw new Error("Invalid habit object");
    }

    try {
      const index = this.data.findIndex((h) => h.id === habit.id);
      if (index === -1) return false;

      this.data[index] = habit;
      this.saveHabits(this.data);
      return true;
    } catch (error) {
      console.error("Failed to update habit:", error);
      return false;
    }
  }

  /**
   * Deletes a habit by ID
   * @param {string} habitId - ID of habit to delete
   * @returns {boolean} Whether deletion was successful
   */
  deleteHabit(habitId) {
    if (!habitId) {
      throw new Error("Habit ID is required");
    }

    try {
      const initialLength = this.data.length;
      this.data = this.data.filter((habit) => habit.id !== habitId);

      if (this.data.length === initialLength) return false;

      this.saveHabits(this.data);
      return true;
    } catch (error) {
      console.error("Failed to delete habit:", error);
      return false;
    }
  }

  /**
   * Saves progress to local storage
   * @param {Object} progress - Progress object to save
   */
  saveProgress(progress) {
    if (!this.isValidProgress(progress)) {
      throw new Error("Invalid progress object");
    }

    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress:", error);
      throw new Error("Failed to save progress");
    }
  }

  /**
   * Loads progress from local storage
   * @returns {Object|null} Progress object or null if not found
   */
  loadProgress() {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return storedProgress ? JSON.parse(storedProgress) : null;
    } catch (error) {
      console.error("Failed to load progress:", error);
      return null;
    }
  }

  /**
   * Validates habit object
   * @private
   * @param {Object} habit - Habit object to validate
   * @returns {boolean} Whether habit is valid
   */
  isValidHabit(habit) {
    return (
      habit &&
      typeof habit.id === "string" &&
      typeof habit.name === "string" &&
      typeof habit.description === "string" &&
      typeof habit.category === "string"
    );
  }

  /**
   * Validates progress object
   * @private
   * @param {Object} progress - Progress object to validate
   * @returns {boolean} Whether progress is valid
   */
  isValidProgress(progress) {
    return (
      progress &&
      typeof progress.level === "number" &&
      typeof progress.exp === "number"
    );
  }
}

// Create singleton instance
const dataManager = new DataManager();

export default dataManager;
