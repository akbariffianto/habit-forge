# HabitForge: Atomic Habits Tracker

## What is HabitForge?

HabitForge is a web application designed to assist users in developing positive habits using principles inspired by James Clear's "Atomic Habits". It features habit tracking with a local storage backend, game-like progression using experience points (EXP) and levels, and a simple Pomodoro timer integration for focused work sessions.

## Key Features

- **Habit Management**: Add, view, edit, and delete habits with customizable frequency (daily, weekly).
- **Gamification System**: Earn XP for habit completion, level up by accumulating XP, and unlock achievements.
- **Pomodoro Timer**: Timed work sessions with adjustable durations to enhance focus and productivity.
- **Local Data Storage**: Utilizes browser's `localStorage` for a seamless, offline-first experience without relying on server-side databases.

## Technologies Used

- **HTML5, CSS3**: Standard web technologies for structure and styling.
- **JavaScript (Vanilla JS)**: Primary language for application logic and dynamic interactions.
- **`localStorage`**: For local storage of user progress and data.
- **Webpack**: Bundling tool for managing and optimizing JavaScript modules.
- **Visual Studio Code**: IDE for development and debugging.
- **Vercel/Netlify**: For deployment and hosting.

**Rationale for Technology Choices**:

*   **HTML5 & CSS3**: Ensuring compatibility across modern browsers with clean, semantic markup.
*   **JavaScript (Vanilla JS)**: For direct control over the DOM and performance, aligned with modular coding practices.
*   `localStorage`: Prioritizing an offline-first approach with no back-end requirements for simpler deployment and user accessibility.
*   **Webpack**: Aiding in modularizing code, optimizing build processes, and managing external libraries if introduced in future expansions.
*   **Visual Studio Code**: For efficient coding and debugging thanks to robust features and extensions.
*   **Vercel/Netlify**: Enabling hassle-free deployment with automatic HTTPS, custom domains, and serverless functions support.

## Setting Up Locally

1.  Clone this repository using Git: `git clone https://github.com/akbariffianto/habit-forge`.
2.  Open the project in Visual Studio Code.
3.  Ensure you have Node.js and npm installed on your system.
4.  Navigate to the project directory in the terminal and run `npm install` to fetch all dependencies.
5.  Start the local development server by executing `npm run start`. Open [http://localhost:8080](http://localhost:8080) in your web browser.

## AI Assistance in Development

Throughout the development of HabitForge, AI tools like IBM Granite played a crucial role in expediting and refining the coding process. Granite provided precise language models to generate structured code snippets, helped optimize JavaScript for performance, and ensured adherence to best practices. It aided in tasks such as structural design, error identification, and even suggested improvements in code modularity and efficiency. Notably, while AI significantly contributed to the development stage, HabitForge operates independently without any AI components embedded within the final product, ensuring a pure user experience focused on habit tracking and gamification.