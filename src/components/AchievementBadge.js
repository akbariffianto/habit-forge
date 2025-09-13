// src/components/AchievementBadge.js

/**
 * Creates an achievement badge element
 * @param {Object} achievement - The achievement object
 * @param {string} achievement.title - Achievement title
 * @param {string} achievement.description - Achievement description
 * @param {string} [achievement.className] - Optional CSS class name
 * @returns {HTMLElement} The created badge element
 */
function createBadge({ title, description, className = '' }) {
  // Validate required parameters
  if (!title || !description) {
    throw new Error('Achievement must have both title and description');
  }

  // Create badge container
  const badge = document.createElement('div');
  badge.className = `achievement-badge ${className}`.trim();

  // Create and append title
  const badgeTitle = document.createElement('h3');
  badgeTitle.textContent = title;
  
  // Create and append description
  const badgeDescription = document.createElement('p');
  badgeDescription.textContent = description;

  // Build badge structure
  badge.append(badgeTitle, badgeDescription);

  return badge;
}

export default createBadge;
