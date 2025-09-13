// src/modules/utils.js

/**
 * Formats seconds into MM:SS time format
 * @param {number} seconds - Number of seconds to format
 * @returns {string} Formatted time string
 * @throws {Error} If seconds is not a valid number
 */
export function formatTime(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    throw new Error('Invalid seconds value');
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${padNumber(minutes)}:${padNumber(secs)}`;
}

/**
 * Pads a number with leading zero if less than 10
 * @private
 * @param {number} num - Number to pad
 * @returns {string} Padded number string
 */
function padNumber(num) {
  return num.toString().padStart(2, '0');
}

/**
 * Generates a unique identifier
 * @param {number} [length=13] - Length of the unique ID
 * @returns {string} Unique identifier
 */
export function generateUniqueId(length = 13) {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, length - timestamp.length);
  
  return `${timestamp}${randomStr}`;
}

/**
 * Validates if a value is a positive number
 * @param {*} value - Value to validate
 * @returns {boolean} Whether the value is a valid positive number
 */
export function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}
