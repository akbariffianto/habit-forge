// src/main.js
import HabitList from "./components/HabitList.js";
import createBadge from "./components/AchievementBadge.js";
import PomodoroTimer from "./components/PomodoroTimer.js";
import dataManager from "./modules/dataManager.js";
import * as gamification from "./modules/gamification.js";
import { generateUniqueId } from "./modules/utils.js";
import { categorizeHabit } from "./modules/replicate.js";

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
      categoryListUl: document.getElementById("categoryListUl"),
      loadingOverlay: document.getElementById("loadingOverlay"),
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
    this.pomodoroTimer = new PomodoroTimer(
      this.elements.timerDisplay,
      this.handleTimerCompletion.bind(this)
    );
  }

  handleTimerCompletion() {
    this.updateTimerButtons();
  }

  setupEventListeners() {
    this.elements.addHabitForm.addEventListener("submit", this.handleAddHabit.bind(this));
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
      const habit = this.habits[habitIndex];
      habit.isCompleted = true;
      habit.exp = gamification.calculateExp();
      dataManager.saveHabits(this.habits);
      gamification.updateProgress(habit.exp, habit.category);
      this.updateUserProgress();
      this.refreshHabits();
    }
  }

  handleHabitDeletion(habitId) {
    dataManager.deleteHabit(habitId);
    this.refreshHabits();
  }

  async handleAddHabit(e) {
    e.preventDefault();
    const form = e.target;
    const habitNameInput = form.querySelector("#habitName");
    const habitDescriptionInput = form.querySelector("#habitDescription");

    if (!habitNameInput?.value || !habitDescriptionInput?.value) return;

    try {
      const habitName = habitNameInput.value.trim();
      const habitDescription = habitDescriptionInput.value.trim();
      const category = await categorizeHabit(habitName, habitDescription);

      const newHabit = {
        id: generateUniqueId(),
        name: habitName,
        description: habitDescription,
        isCompleted: false,
        category
      };

      gamification.registerCategory(category);
      dataManager.addHabit(newHabit);
      this.refreshHabits();
      form.reset();
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  }

  updateTimerButtons() {
    const { startTimerBtn, pauseTimerBtn, resetTimerBtn } = this.elements;
    startTimerBtn.style.display = this.pomodoroTimer.isRunning ? "none" : "inline-block";
    pauseTimerBtn.style.display = this.pomodoroTimer.isRunning ? "inline-block" : "none";
    resetTimerBtn.style.display = this.pomodoroTimer.isRunning ? "none" : "inline-block";
  }

  updateUserProgress() {
    const userProgress = gamification.getUserProgress();
    const { expDisplay, levelDisplay, levelNameDisplay, expBar } = this.elements;

    expDisplay.textContent = `${userProgress.exp} / ${gamification.CONSTANTS.LEVEL_UP_EXP_THRESHOLD}`;
    levelDisplay.textContent = userProgress.level;
    levelNameDisplay.textContent = gamification.getLevelName(userProgress.level);

    const expPercentage = (userProgress.exp / gamification.CONSTANTS.LEVEL_UP_EXP_THRESHOLD) * 100;
    expBar.style.width = `${expPercentage}%`;

    this.updateAchievements(userProgress.achievements);
    this.updateCategoryList();
  }

  updateCategoryList() {
    const userProgress = gamification.getUserProgress();
    const progressCategories = userProgress.categories || {};
    const totalTasksPerCategory = this.habits.reduce((acc, habit) => {
      if (!habit.isCompleted) {
        acc[habit.category] = (acc[habit.category] || 0) + 1;
      }
      return acc;
    }, {});

    this.elements.categoryListUl.innerHTML = "";
    Object.entries(progressCategories).forEach(([category, data]) => {
      const li = document.createElement("li");
      const completedCount = data.completed || 0;
      const totalCount = totalTasksPerCategory[category] || 0;
      li.innerHTML = `<span>${category}</span><span>${completedCount} / ${totalCount}</span>`;
      this.elements.categoryListUl.appendChild(li);
    });
  }

  refreshHabits() {
    this.habits = dataManager.loadHabits();
    this.habitList.renderHabits(this.habits);
    this.updateCategoryList();
  }

  updateAchievements(achievements) {
    this.elements.achievementsList.innerHTML = "";
    if (achievements?.length) {
      const badgeElement = createBadge({
        title: achievements[achievements.length - 1],
        description: "Consistent habits!, Keep Going Brother!",
        className: "gold-badge",
      });
      this.elements.achievementsList.appendChild(badgeElement);
    }
  }

  showLoading() {
    this.elements.loadingOverlay.classList.remove('hidden');
  }

  hideLoading() {
    this.elements.loadingOverlay.classList.add('hidden');
  }

  async initApp() {
    this.showLoading();
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
      gamification.initUserProgress();
      this.refreshHabits();
      this.updateUserProgress();
    } finally {
      this.hideLoading();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
