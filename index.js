
const inputNode = document.querySelector(".js-inputMovie");
const btnAddNode = document.querySelector(".js-btn-new-movie");
const listlNode = document.querySelector(".js-movies-list");

let movies = [];
inputNode.focus();

if(localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
  movies.forEach((movie) => renderMovie(movie));
}

inputNode.addEventListener('input', function() {
  if (listlNode.value !=="")  {
    btnAddNode.disabled = false;
   } else {
    btnAddNode.disabled = true;
   }
})

btnAddNode.addEventListener("click", function() {
  const movieFromUser = getMovieFromUser();
  addMovie(movieFromUser);
  renderMovie();
  saveToLocalStorage();
  clearInput();
  btnAddNode.disabled = true;
});

function getMovieFromUser() {
  const value = inputNode.value;
  const movie = value.trim();
  return movie;
};

function addMovie(movie) {
  movies.push ({
    movie: movie,
    completed: false,
    id: Date.now(),
  });
};

function getMovies() {
  return movies;

};

function renderMovie() {
  const movies = getMovies();
  let movieHTML = "";

  movies.forEach(movie => {
    movieHTML += `
    <li id="${movie.id}" class="${movie.completed ? "movieItem movieItem-selected" : 'movieItem'}" >
      <div class="${movie.completed ? "btn-selected btn-selected-close" : 'btn-selected'}" data-action="done"></div>
      <div class="movieName" >${movie.movie}</div>
      <button class="btn-delete" data-action="delete" ></button>
    </li>
    `
  });
  listlNode.innerHTML = movieHTML;
};

function saveToLocalStorage() {
  localStorage.setItem('movies', JSON.stringify(movies))
};

function clearInput() {
  inputNode.value = "";
  inputNode.focus();
}

listlNode.addEventListener('click', deleteMovie);
listlNode.addEventListener('click', doneMovie);

function deleteMovie(event) {
  if (event.target.dataset.action === 'delete') {
   const parentNode = event.target.closest('.movieItem');
   const id = parseInt(parentNode.id);
   const index = movies.findIndex(function(elem) {
    if (elem.id === id) {
      return true;
    };
  });
  alert('Правда хочешь удалить?')
  movies.splice(index, 1);
  saveToLocalStorage();
  parentNode.remove();
  inputNode.focus();
  }
}

function doneMovie(event) {
  if (event.target.dataset.action === 'done') {
   const parentNode = event.target.closest('.movieItem');
   const id = parseInt(parentNode.id);

   const movie = movies.find(function(movie) { 
     if (movie.id === id) {
       return true; 
     }
   })
   movie.completed = !movie.completed
   const btnDone = parentNode.querySelector('.btn-selected');
   parentNode.classList.toggle('movieItem-selected')
   btnDone.classList.toggle('btn-selected-close');
   saveToLocalStorage();
   inputNode.focus();
  }
}

       
    