require('dotenv').config();
const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "connect-src 'self' localhost:* http://localhost:*; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://cdn.boxicons.com https://fonts.googleapis.com; " +
    "font-src 'self' https://cdn.boxicons.com https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "frame-src 'self'"
  );
  next();
});

// Serve static files from src directory
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));

// --- HANYA RUTE API ---
app.post('/api/categorize', async (req, res) => {
  const { habitName, habitDescription } = req.body;

  if (!habitName || !habitDescription) {
    return res.status(400).json({ error: 'habitName and habitDescription are required' });
  }
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error("Replicate API token is not set.");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const prompt = `Categorize the following habit: '${habitName} - ${habitDescription}'.
  Choose only one category from this list: Health, Work, Learning, Personal, Social, Other.
  Respond with only the category name.`;

  try {
    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 10,
          temperature: 0.1,
        }
      }
    );
    res.status(200).json({ category: output.join('').trim() });
  } catch (error) {
    console.error('Replicate API Error:', error);
    res.status(500).json({ 
      error: 'Failed to categorize habit.',
      details: error.message 
    });
  }
});

// Handle all other routes for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Tidak perlu app.listen(), Vercel menanganinya
module.exports = app;