// src/components/HabitList.js

/**
 * Class representing a list of habits
 */
class HabitList {
  /**
   * Create a habit list
   * @param {HTMLElement} container - Container element for the habit list
   * @param {Function} onComplete - Callback for habit completion
   * @param {Function} onDelete - Callback for habit deletion
   */
  constructor(container, onComplete, onDelete) {
    this.container = container;
    this.onComplete = onComplete;
    this.onDelete = onDelete;
  }

  /**
   * Creates a button element with specified properties
   * @private
   */
  createButton({ className, innerHTML, onClick }) {
    const button = document.createElement('button');
    Object.assign(button, { className, innerHTML });
    button.addEventListener('click', onClick);
    return button;
  }

  /**
   * Creates a div element with specified properties
   * @private
   */
  createDiv({ className, textContent = '' }) {
    const div = document.createElement('div');
    Object.assign(div, { className, textContent });
    return div;
  }

  /**
   * Creates habit element
   * @private
   */
  createHabitElement(habit) {
    const habitElement = this.createDiv({ 
      className: `habit-item ${habit.isCompleted ? 'completed' : ''}`
    });

    // Create habit info section
    const habitInfo = this.createDiv({ className: 'habit-info' });
    habitInfo.append(
      this.createDiv({ className: 'habit-name', textContent: habit.name }),
      this.createDiv({ className: 'habit-description', textContent: habit.description })
    );

    // Create action buttons
    const habitActions = this.createDiv({ className: 'habit-actions' });
    const completeButton = this.createButton({
      className: `complete-button ${habit.isCompleted ? 'completed' : ''}`,
      innerHTML: `<i class="bx bx-check-circle"></i> ${habit.isCompleted ? 'Completed' : 'Mark Complete'}`,
      onClick: () => this.onComplete(habit.id)
    });

    const deleteButton = this.createButton({
      className: 'delete-button',
      innerHTML: '<i class="bx bx-trash"></i>',
      onClick: () => this.onDelete(habit.id)
    });

    habitActions.append(completeButton, deleteButton);
    habitElement.append(habitInfo, habitActions);

    return habitElement;
  }

  /**
   * Renders the list of habits
   * @param {Array} habits - Array of habit objects
   */
  renderHabits(habits) {
    const fragment = document.createDocumentFragment();
    habits.forEach(habit => fragment.appendChild(this.createHabitElement(habit)));
    
    // Clear container
    this.container.innerHTML = '';

    // Append fragment to container
    this.container.appendChild(fragment);
  }
}

export default HabitList;