let watchedMovies = [];
let unwatchedMovies = [];

function addToWatched() {
  const movieTitle = document.getElementById('movie-title').value.trim();
  
  if (!movieTitle) return;

  const newMovie = {
    title: movieTitle,
    image: null
  };

  watchedMovies.push(newMovie);
  document.getElementById('movie-title').value = ''; // Очистить поле ввода
  renderMovies();
}

function addToUnwatched() {
  const movieTitle = document.getElementById('movie-title').value.trim();
  
  if (!movieTitle) return;

  const newMovie = {
    title: movieTitle,
    image: null
  };

  unwatchedMovies.push(newMovie);
  document.getElementById('movie-title').value = ''; // Очистить поле ввода
  renderMovies();
}

function renderMovies() {
  const watchedContainer = document.getElementById('watched');
  const unwatchedContainer = document.getElementById('unwatched');

  // Очистить контейнеры перед рендерингом
  watchedContainer.innerHTML = '';
  unwatchedContainer.innerHTML = '';

  // Добавить фильмы в просмотренные
  watchedMovies.forEach((movie, index) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-tile');

    // Картинка фильма
    const imageElement = document.createElement('img');
    if (movie.image) {
      imageElement.src = movie.image;
    }
    movieElement.appendChild(imageElement);

    // Заголовок фильма с возможностью редактирования
    const movieTitle = document.createElement('p');
    movieTitle.classList.add('edit-title');
    movieTitle.textContent = movie.title;
    movieTitle.addEventListener('click', () => editMovieTitle(index, 'watched'));
    movieElement.appendChild(movieTitle);

    // Кнопка удаления фильма
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '×';
    deleteButton.addEventListener('click', () => deleteMovie(index, 'watched'));
    movieElement.appendChild(deleteButton);

    // Кнопка добавления картинки
    const addImageButton = document.createElement('button');
    addImageButton.classList.add('add-image-button');
    addImageButton.textContent = 'Добавить картинку';
    addImageButton.addEventListener('click', () => openImageDialog(index, 'watched'));
    movieElement.appendChild(addImageButton);

    watchedContainer.appendChild(movieElement);
  });

  // Добавить фильмы в не просмотренные
  unwatchedMovies.forEach((movie, index) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-tile');

    // Картинка фильма
    const imageElement = document.createElement('img');
    if (movie.image) {
      imageElement.src = movie.image;
    }
    movieElement.appendChild(imageElement);

    // Заголовок фильма с возможностью редактирования
    const movieTitle = document.createElement('p');
    movieTitle.classList.add('edit-title');
    movieTitle.textContent = movie.title;
    movieTitle.addEventListener('click', () => editMovieTitle(index, 'unwatched'));
    movieElement.appendChild(movieTitle);

    // Кнопка удаления фильма
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '×';
    deleteButton.addEventListener('click', () => deleteMovie(index, 'unwatched'));
    movieElement.appendChild(deleteButton);

    // Кнопка добавления картинки
    const addImageButton = document.createElement('button');
    addImageButton.classList.add('add-image-button');
    addImageButton.textContent = 'Добавить картинку';
    addImageButton.addEventListener('click', () => openImageDialog(index, 'unwatched'));
    movieElement.appendChild(addImageButton);

    unwatchedContainer.appendChild(movieElement);
  });
}

function openImageDialog(index, listType) {
  // Создаем временный input для загрузки изображения
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', (event) => {
    handleImageUpload(event, index, listType);
  });

  fileInput.click(); // Программно открываем диалог выбора файла
}

function handleImageUpload(event, index, listType) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result;
    if (listType === 'watched') {
      watchedMovies[index].image = imageUrl;
    } else {
      unwatchedMovies[index].image = imageUrl;
    }
    renderMovies();
  };
  reader.readAsDataURL(file);
}

function deleteMovie(index, listType) {
  if (listType === 'watched') {
    watchedMovies.splice(index, 1); // Удалить фильм из списка просмотренных
  } else {
    unwatchedMovies.splice(index, 1); // Удалить фильм из списка не просмотренных
  }
  renderMovies(); // Перерисовать фильмы после удаления
}

function editMovieTitle(index, listType) {
  const newTitle = prompt("Введите новое название фильма:", listType === 'watched' ? watchedMovies[index].title : unwatchedMovies[index].title);
  if (newTitle !== null && newTitle.trim() !== "") {
    if (listType === 'watched') {
      watchedMovies[index].title = newTitle;
    } else {
      unwatchedMovies[index].title = newTitle;
    }
    renderMovies(); // Перерисовать список после изменения названия
  }
}
