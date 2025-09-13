// src/modules/gamification.js

import dataManager from './dataManager.js';

// Game constants
const CONSTANTS = {
  EXP_PER_HABIT: 10,
  LEVEL_UP_EXP_THRESHOLD: 100,
  LEVEL_NAMES: ['Rookie', 'Beginner', 'Adept', 'Pro', 'Master', 'Legend'],
  ACHIEVEMENTS: {
    FIRST_STEP: { name: 'First Step', expRequired: 10 },
    HALFWAY: { name: 'Halfway There', expRequired: 50 },
    LEVEL_UP: { name: 'Level Up!', expRequired: 100 }
  }
};

// User progress state
let userProgress = {
  totalExp: 0,
  level: 1,
  achievements: []
};

/**
 * Initializes user progress from storage or creates new
 */
function initUserProgress() {
  try {
    const storedProgress = dataManager.loadProgress();
    userProgress = storedProgress || {
      totalExp: 0,
      level: 1,
      achievements: []
    };
    if (!storedProgress) {
      dataManager.saveProgress(userProgress);
    }
  } catch (error) {
    console.error('Failed to initialize progress:', error);
  }
}

/**
 * Calculates experience points for completed habits
 * @returns {number} Experience points
 */
function calculateExp() {
  return CONSTANTS.EXP_PER_HABIT;
}

/**
 * Updates user progress with new experience points
 * @param {number} expToAdd - Experience points to add
 */
function updateProgress(expToAdd) {
  if (typeof expToAdd !== 'number' || expToAdd < 0) {
    throw new Error('Invalid experience points');
  }

  try {
    userProgress.totalExp += expToAdd;
    userProgress.level = Math.floor(userProgress.totalExp / CONSTANTS.LEVEL_UP_EXP_THRESHOLD) + 1;
    userProgress.exp = userProgress.totalExp % CONSTANTS.LEVEL_UP_EXP_THRESHOLD;
    
    const newAchievements = checkAchievements(userProgress.totalExp);
    userProgress.achievements = [...new Set([...userProgress.achievements, ...newAchievements])];
    
    dataManager.saveProgress(userProgress);
  } catch (error) {
    console.error('Failed to update progress:', error);
    throw error;
  }
}

/**
 * Checks for newly unlocked achievements
 * @param {number} totalExp - Total experience points
 * @returns {string[]} Array of new achievements
 */
function checkAchievements(totalExp) {
  const newAchievements = [];
  
  Object.values(CONSTANTS.ACHIEVEMENTS).forEach(achievement => {
    if (totalExp >= achievement.expRequired && 
        !userProgress.achievements.includes(achievement.name)) {
      newAchievements.push(achievement.name);
    }
  });
  
  return newAchievements;
}

/**
 * Gets current user progress
 * @returns {Object} User progress object
 */
function getUserProgress() {
  return { ...userProgress };
}

/**
 * Gets level name based on current level
 * @param {number} level - Current level
 * @returns {string} Level name
 */
function getLevelName(level) {
  if (typeof level !== 'number' || level <= 0) {
    return CONSTANTS.LEVEL_NAMES[0];
  }
  const index = Math.min(level - 1, CONSTANTS.LEVEL_NAMES.length - 1);
  return CONSTANTS.LEVEL_NAMES[index];
}

export {
  calculateExp,
  updateProgress,
  checkAchievements,
  getUserProgress,
  initUserProgress,
  getLevelName,
  CONSTANTS
};