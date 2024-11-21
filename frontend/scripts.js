const apiURL = 'https://your-backend-url.onrender.com/api/shows'; // Ссылка на ваш backend

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
