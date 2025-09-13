// src/components/AchievementBadge.js

/**
 * Creates an achievement badge element
 * @param {Object} achievement
 * @param {string} achievement.title - Achievement title
 * @param {string} achievement.description - Achievement description
 * @param {string} [achievement.className] - Optional CSS class name
 * @returns {HTMLElement}
 */
function createBadge({ title, description, className = '' }) {
  if (!title || !description) {
    throw new Error('Achievement must have both title and description');
  }

  const badge = document.createElement('div');
  const badgeTitle = document.createElement('h3');
  const badgeDescription = document.createElement('p');

  badge.className = `achievement-badge ${className}`.trim();
  badgeTitle.textContent = title;
  badgeDescription.textContent = description;
  
  badge.append(badgeTitle, badgeDescription);

  return badge;
}

export default createBadge;
