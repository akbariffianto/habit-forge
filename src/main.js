// src/main.js
import HabitList from "./components/HabitList.js";
import createBadge from "./components/AchievementBadge.js";
import PomodoroTimer from "./components/PomodoroTimer.js";
import dataManager from "./modules/dataManager.js";
import * as gamification from "./modules/gamification.js";
import { generateUniqueId } from "./modules/utils.js";

class App {
  constructor() {
    this.habits = [];
    this.initializeElements();
    this.initializeComponents();
    this.setupEventListeners();
    this.initApp();
  }

  initializeElements() {
    this.elements = {
      habitListContainer: document.getElementById("habitListContainer"),
      addHabitForm: document.getElementById("addHabitForm"),
      startTimerBtn: document.getElementById("startTimer"),
      pauseTimerBtn: document.getElementById("pauseTimer"),
      resetTimerBtn: document.getElementById("resetTimer"),
      timerDisplay: document.getElementById("timerDisplay"),
      expDisplay: document.getElementById("expDisplay"),
      levelDisplay: document.getElementById("levelDisplay"),
      achievementsList: document.getElementById("achievementsList"),
      expBar: document.getElementById("expBar"),
      levelNameDisplay: document.getElementById("levelName"),
    };

    if (!this.validateElements()) {
      throw new Error("Required elements not found");
    }
  }

  validateElements() {
    return Object.values(this.elements).every((element) => element !== null);
  }

  initializeComponents() {
    this.habits = dataManager.loadHabits();
    this.habitList = new HabitList(
      this.elements.habitListContainer,
      this.handleHabitCompletion.bind(this),
      this.handleHabitDeletion.bind(this)
    );
    this.pomodoroTimer = new PomodoroTimer(this.elements.timerDisplay);
  }

  setupEventListeners() {
    this.elements.addHabitForm.addEventListener(
      "submit",
      this.handleAddHabit.bind(this)
    );
    this.elements.startTimerBtn.addEventListener("click", () => {
      this.pomodoroTimer.start();
      this.updateTimerButtons();
    });
    this.elements.pauseTimerBtn.addEventListener("click", () => {
      this.pomodoroTimer.pause();
      this.updateTimerButtons();
    });
    this.elements.resetTimerBtn.addEventListener("click", () => {
      this.pomodoroTimer.reset();
      this.updateTimerButtons();
    });
  }

  handleHabitCompletion(habitId) {
    const habitIndex = this.habits.findIndex((h) => h.id === habitId);
    if (habitIndex !== -1 && !this.habits[habitIndex].isCompleted) {
      this.habits[habitIndex].isCompleted = true;
      this.habits[habitIndex].exp = gamification.calculateExp();

      dataManager.saveHabits(this.habits);
      gamification.updateProgress(this.habits[habitIndex].exp);

      this.updateUserProgress();
      this.refreshHabits();
    }
  }

  handleHabitDeletion(habitId) {
    dataManager.deleteHabit(habitId);
    this.refreshHabits();
  }

  handleAddHabit(e) {
    e.preventDefault();
    const form = e.target;
    const habitNameInput = form.querySelector("#habitName");
    const habitDescriptionInput = form.querySelector("#habitDescription");

    if (!habitNameInput?.value || !habitDescriptionInput?.value) {
      console.error("Invalid form data");
      return;
    }

    const newHabit = {
      id: generateUniqueId(),
      name: habitNameInput.value.trim(),
      description: habitDescriptionInput.value.trim(),
      isCompleted: false,
    };

    dataManager.addHabit(newHabit);
    this.refreshHabits();
    form.reset();
  }

  updateTimerButtons() {
    const { startTimerBtn, pauseTimerBtn, resetTimerBtn } = this.elements;
    startTimerBtn.style.display = this.pomodoroTimer.isRunning
      ? "none"
      : "inline-block";
    pauseTimerBtn.style.display = this.pomodoroTimer.isRunning
      ? "inline-block"
      : "none";
    resetTimerBtn.style.display = this.pomodoroTimer.isRunning
      ? "none"
      : "inline-block";
  }

  updateUserProgress() {
    const userProgress = gamification.getUserProgress();
    const {
      expDisplay,
      levelDisplay,
      levelNameDisplay,
      expBar,
      achievementsList,
    } = this.elements;

    // Fix: Use totalExp instead of exp and use CONSTANTS for threshold
    expDisplay.textContent = `${userProgress.exp} / ${gamification.CONSTANTS.LEVEL_UP_EXP_THRESHOLD}`;
    levelDisplay.textContent = userProgress.level;
    levelNameDisplay.textContent = gamification.getLevelName(userProgress.level);

    // Fix: Calculate percentage using totalExp
    const expPercentage = (userProgress.exp / gamification.CONSTANTS.LEVEL_UP_EXP_THRESHOLD) * 100;
    expBar.style.width = `${expPercentage}%`;

    this.updateAchievements(userProgress.achievements);
  }

  updateAchievements(achievements) {
    this.elements.achievementsList.innerHTML = "";
    if (achievements.length > 0) {
      const latestAchievement = achievements[achievements.length - 1];
      const badgeElement = createBadge({
        title: latestAchievement,
        description: "Consistent habits!, Keep Going Brother!",
        className: "gold-badge",
      });
      this.elements.achievementsList.appendChild(badgeElement);
    }
  }

  refreshHabits() {
    this.habits = dataManager.loadHabits();
    this.habitList.renderHabits(this.habits);
  }

  initApp() {
    gamification.initUserProgress();
    this.refreshHabits();
    this.updateUserProgress();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new App();
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
});
