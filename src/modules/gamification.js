// src/modules/gamification.js

import dataManager from './dataManager.js';

export const CONSTANTS = {
  EXP_PER_HABIT: 10,
  LEVEL_UP_EXP_THRESHOLD: 100,
  LEVEL_NAMES: ['Rookie', 'Beginner', 'Adept', 'Pro', 'Master', 'Legend'],
  ACHIEVEMENTS: {
    FIRST_STEP: { name: 'First Step', expRequired: 10 },
    HALFWAY: { name: 'Halfway There', expRequired: 50 },
    LEVEL_UP: { name: 'Level Up!', expRequired: 100 }
  }
};

let userProgress = {};

/**
 * Initializes user progress from storage or creates new
 */
export function initUserProgress() {
  try {
    const storedProgress = dataManager.loadProgress();
    if (!storedProgress) {
      userProgress = {
        totalExp: 0,
        level: 1,
        exp: 0,
        achievements: [],
        categories: {}
      };
      dataManager.saveProgress(userProgress);
    } else {
      userProgress = storedProgress;
      if (!userProgress.categories) {
        userProgress.categories = {};
      }
    }
  } catch (error) {
    console.error('Failed to initialize progress:', error);
  }
}

/**
 * Updates user progress with new experience points
 * @param {number} expToAdd - Experience points to add
 */
export function updateProgress(expToAdd, category) {
  if (typeof expToAdd !== 'number' || expToAdd < 0) {
    throw new Error('Invalid experience points');
  }

  try {
    userProgress.totalExp += expToAdd;
    userProgress.level = Math.floor(userProgress.totalExp / CONSTANTS.LEVEL_UP_EXP_THRESHOLD) + 1;
    userProgress.exp = userProgress.totalExp % CONSTANTS.LEVEL_UP_EXP_THRESHOLD;
    
    if (category) {
      if (!userProgress.categories[category]) {
        userProgress.categories[category] = { completed: 0 };
      }
      userProgress.categories[category].completed++;
    }

    const newAchievements = checkAchievements(userProgress.totalExp);
    userProgress.achievements = [...new Set([...userProgress.achievements, ...newAchievements])];
    
    dataManager.saveProgress(userProgress);
  } catch (error) {
    console.error('Failed to update progress:', error);
    throw error;
  }
}

/**
 * Registers a new category for the user
 * @param {string} category - Category name
 */
export function registerCategory(category) {
  if (!userProgress.categories[category]) {
    userProgress.categories[category] = { completed: 0 };
    dataManager.saveProgress(userProgress);
  }
}

/**
 * Calculates experience points for completed habits
 * @returns {number} Experience points
 */
export function calculateExp() {
  return CONSTANTS.EXP_PER_HABIT;
}

/**
 * Checks for newly unlocked achievements
 * @param {number} totalExp - Total experience points
 * @returns {string[]} Array of new achievements
 */
export function checkAchievements(totalExp) {
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
export function getUserProgress() {
  return { ...userProgress };
}

/**
 * Gets level name based on current level
 * @param {number} level - Current level
 * @returns {string} Level name
 */
export function getLevelName(level) {
  if (typeof level !== 'number' || level <= 0) {
    return CONSTANTS.LEVEL_NAMES[0];
  }
  return CONSTANTS.LEVEL_NAMES[Math.min(level - 1, CONSTANTS.LEVEL_NAMES.length - 1)];
}