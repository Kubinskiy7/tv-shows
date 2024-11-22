const apiURL = 'https://tv-shows-backend.onrender.com/api/shows'; // Ваш URL Render

// Получение списка сериалов
fetch(apiURL)
  .then((response) => response.json())
  .then((shows) => {
    const showsDiv = document.getElementById('shows');
    shows.forEach((show) => {
      const showDiv = document.createElement('div');
      showDiv.className = 'show';
      showDiv.innerHTML = `
        <h3>${show.title}</h3>
      `;
      showsDiv.appendChild(showDiv);
    });
  })
  .catch((error) => {
    console.error('Ошибка загрузки данных:', error);
  });
