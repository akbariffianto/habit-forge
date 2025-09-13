/**
 * Mengkategorikan kebiasaan dengan memanggil backend proxy kita.
 * @param {string} habitName - Nama kebiasaan.
 * @param {string} habitDescription - Deskripsi kebiasaan.
 * @returns {Promise<string>} Kategori kebiasaan.
 */
export async function categorizeHabit(habitName, habitDescription) {
  const response = await fetch('/api/categorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ habitName, habitDescription })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch category from server');
  }

  const data = await response.json();
  return data.category;
}