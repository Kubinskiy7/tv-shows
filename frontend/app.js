document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const suggestions = document.getElementById('suggestions');

  // Search for shows
  searchBar.addEventListener('input', async () => {
    const query = searchBar.value;
    if (query.length < 2) {
      suggestions.innerHTML = '';
      return;
    }

    const response = await fetch(`https://your-backend-url.onrender.com/api/shows?search=${query}`);
    const shows = await response.json();
    suggestions.innerHTML = shows.map(show => `
      <div class="suggestion">
        <img src="${show.poster}" alt="${show.name}" />
        <span>${show.name}</span>
      </div>
    `).join('');
  });
});
