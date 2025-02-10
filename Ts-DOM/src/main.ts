import './style.css'
import { DatabaseService } from './database.service'

// Create async initialization function
async function initializeApp() {
  const db = new DatabaseService();
  // Wait for DB to initialize
  await db.initDatabase();

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
      <h1>Movie Management System</h1>
      
      <div class="add-movie-form">
        <h2>Add New Movie</h2>
        <input type="text" id="title" placeholder="Movie Title" />
        <input type="text" id="director" placeholder="Director" />
        <input type="number" id="year" placeholder="Year" />
        <button id="addMovie">Add Movie</button>
      </div>

      <div class="movie-list">
        <h2>Movies</h2>
        <div id="moviesList"></div>
      </div>
    </div>
  `;

  // Update the displayMovies function
  async function displayMovies() {
    const moviesList = document.querySelector('#moviesList')!;
    const movies = await db.getAllMovies();

    moviesList.innerHTML = movies.map(movie => `
        <div class="movie-card" id="movie-${movie.id}">
            <div class="movie-content">
                <h3>${movie.title}</h3>
                <p>Director: ${movie.director}</p>
                <p>Year: ${movie.year}</p>
                <p>Rating: ${movie.rating}/5</p>
                <div class="movie-actions">
                    <input type="number" min="0" max="5" placeholder="Rate (0-5)" class="rating-input" data-id="${movie.id}">
                    <button onclick="editMovie(${movie.id})">Edit</button>
                    <button onclick="deleteMovie(${movie.id})">Delete</button>
                </div>
            </div>
            <div class="edit-form" id="edit-${movie.id}" style="display: none;">
                <input type="text" class="edit-title" value="${movie.title}" placeholder="Movie Title">
                <input type="text" class="edit-director" value="${movie.director}" placeholder="Director">
                <input type="number" class="edit-year" value="${movie.year}" placeholder="Year">
                <button onclick="saveMovie(${movie.id})">Save</button>
                <button onclick="cancelEdit(${movie.id})">Cancel</button>
            </div>
        </div>
    `).join('');
  }

  // Add event listeners
  document.querySelector('#addMovie')?.addEventListener('click', async () => {
    const title = (document.querySelector('#title') as HTMLInputElement).value;
    const director = (document.querySelector('#director') as HTMLInputElement).value;
    const year = parseInt((document.querySelector('#year') as HTMLInputElement).value);

    if (title && director && year) {
      await db.addMovie(title, director, year);
      await displayMovies();
      // Clear inputs
      (document.querySelector('#title') as HTMLInputElement).value = '';
      (document.querySelector('#director') as HTMLInputElement).value = '';
      (document.querySelector('#year') as HTMLInputElement).value = '';
    }
  });

  // Add event listener for rating changes
  document.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('rating-input')) {
      const movieId = parseInt(target.dataset.id!);
      const rating = parseFloat(target.value);
      if (rating >= 0 && rating <= 5) {
        await db.rateMovie(movieId, rating);
        await displayMovies();
      }
    }
  });

  // Add function to handle movie deletion
  window.deleteMovie = async (id: number) => {
    await db.deleteMovie(id);
    await displayMovies();
  };

  // Add edit functions to window object
  window.editMovie = (id: number) => {
    const movieCard = document.querySelector(`#movie-${id} .movie-content`)! as HTMLElement;
    const editForm = document.querySelector(`#edit-${id}`)! as HTMLElement;
    movieCard.style.display = 'none';
    editForm.style.display = 'block';
  };

  window.cancelEdit = (id: number) => {
    const movieCard = document.querySelector(`#movie-${id} .movie-content`)! as HTMLElement;
    const editForm = document.querySelector(`#edit-${id}`)! as HTMLElement;
    movieCard.style.display = 'block';
    editForm.style.display = 'none';
  };

  window.saveMovie = async (id: number) => {
    const editForm = document.querySelector(`#edit-${id}`)!;
    const title = (editForm.querySelector('.edit-title') as HTMLInputElement).value;
    const director = (editForm.querySelector('.edit-director') as HTMLInputElement).value;
    const year = parseInt((editForm.querySelector('.edit-year') as HTMLInputElement).value);

    if (title && director && year) {
      await db.updateMovie(id, title, director, year);
      await displayMovies();
    }
  };

  // Display movies immediately after initialization
  await displayMovies();
}

// Start the application
initializeApp().catch(console.error);

// Add type declaration for global deleteMovie function
declare global {
  interface Window {
    deleteMovie: (id: number) => Promise<void>;
    editMovie: (id: number) => void;
    cancelEdit: (id: number) => void;
    saveMovie: (id: number) => Promise<void>;
  }
}
