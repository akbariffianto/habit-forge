require('dotenv').config();
const express = require('express');
const path = require('path');
const Replicate = require('replicate');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// --- RUTE API ---
app.post('/api/categorize', async (req, res) => {
  const { habitName, habitDescription } = req.body;

  if (!habitName || !habitDescription) {
    return res.status(400).json({ error: 'habitName and habitDescription are required' });
  }

  // Pastikan API token ada
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error("Replicate API token is not set in .env file.");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  // Prompt yang disesuaikan untuk Llama 2
  const prompt = `Categorize the following habit: '${habitName} - ${habitDescription}'.
  Choose only one category from this list: Health, Work, Learning, Personal, Social, Other.
  Respond with only the category name.`;

  try {
    // Menggunakan model Meta Llama 2 yang terverifikasi dan publik
    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: prompt,
          // Parameter tambahan untuk mengontrol output
          max_new_tokens: 10,
          temperature: 0.1,
        }
      }
    );
    
    // Membersihkan dan mengirim output
    res.status(200).json({ category: output.join('').trim() });

  } catch (error) {
    // Logging yang lebih detail untuk debugging
    console.error('Replicate API Error:', error);
    res.status(500).json({ 
      error: 'Failed to categorize habit.',
      details: error.message 
    });
  }
});

// --- MENYAJIKAN BERKAS STATIS (FRONTEND) ---
app.use(express.static(path.join(__dirname)));

// --- FALLBACK UNTUK APLIKASI SATU HALAMAN (SPA) ---
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;