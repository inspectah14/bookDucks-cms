const bookForm = document.querySelector("#bookForm");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRating = document.querySelector("#bookRating");
const bookCover = document.querySelector("#bookCover");
const bookGenreCheckboxes = document.querySelectorAll("[name='book-genre']");
const addBookContainer = document.querySelector("#addBookContainer");
const addAudioContainer = document.querySelector("#addAudioContainer");
const loggedInHeadings = document.querySelector("#loggedInHeadings");

let checkedGenreBookBox = [];

let loggedInUserObj = sessionStorage.getItem("loggedInUser");

const addBook = async () => {
  loggedInUserObj = JSON.parse(loggedInUserObj);

  bookGenreCheckboxes.forEach((box) => {
    if(box.checked) {
      checkedGenreBookBox.push(box.value);
    }
  })

  let image = bookCover.files;
  let imgData = new FormData();
  imgData.append('files', image[0]);
  
  axios.post("http://localhost:1337/api/upload", imgData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    } 
  }).then(res => {
      let imageId = res.data[0].id;
      axios.post("http://localhost:1337/api/books", {
              data: {
                  title: bookTitle.value,
                  author: bookAuthor.value,
                  pages: bookPages.value,
                  rating: bookRating.value,
                  bookCover: imageId,
                  genres: checkedGenreBookBox,
                  userId: loggedInUserObj.id,
                  user: loggedInUserObj.id
              }
          },
          {
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`
              }
          })
      })
}

const bookGenreFunc = async () => {
  let isChecked = false;
    for (let i = 0; i < bookGenreCheckboxes.length; i++) {
        if ( bookGenreCheckboxes[i].checked ) {
            isChecked = true;
        };
    };
    if ( isChecked ) {
      addBook();
    } else {
            alert( 'Please, check at least one checkbox!' );
        }   
};

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  bookGenreFunc();
})

const audioForm = document.querySelector("#audioForm");
const audioTitle = document.querySelector("#audioTitle");
const audioRelease = document.querySelector("#audioRelease");
const audioLength = document.querySelector("#audioLength");
const audioRating = document.querySelector("#audioRating");
const audioCover = document.querySelector("#audioCover");
const audioGenre = document.querySelector("#audioGenre");
const audioGenreCheckboxes = document.querySelectorAll("[name='audio-genre']");

let checkedGenreAudioBox = [];

const addAudio = async () => {
  loggedInUserObj = JSON.parse(loggedInUserObj);
  let checkedGenres = false;

  audioGenreCheckboxes.forEach((box) => {
    if(box.checked === true) {
        checkedGenreAudioBox.push(box.value);
        checkedGenres = true;
    }
  })

  if(!checkedGenres) {
    alert("Please check one or more genre.");
  }

  let image = audioCover.files;
  let imgData = new FormData();
  imgData.append('files', image[0]);
  
  axios.post("http://localhost:1337/api/upload", imgData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    } 
  }).then(res => {
      let imageId = res.data[0].id;
      axios.post("http://localhost:1337/api/audiobooks", {
              data: {
                  title: audioTitle.value,
                  releaseDate: audioRelease.value,
                  lengthMin: audioLength.value,
                  rating: audioRating.value,
                  bookCover: imageId,
                  genres: checkedGenreAudioBox,
                  userId: loggedInUserObj.id,
                  user: loggedInUserObj.id
              }
          },
          {
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`
              }
          })
      })
}

const audioGenreFunc = async () => {
  let isChecked = false;
    for (let i = 0; i < audioGenreCheckboxes.length; i++) {
        if ( audioGenreCheckboxes[i].checked ) {
            isChecked = true;
        };
    };
    if ( isChecked ) {
      addAudio();
    } else {
            alert( 'Please, check at least one checkbox!' );
        }   
};

audioForm.addEventListener("submit", (e) => {
  e.preventDefault();
  audioGenreFunc();
})

if(!sessionStorage.getItem("token")){
  addBookContainer.style.display = "none";
  addAudioContainer.style.display = "none";
  loggedInHeadings.classList.remove("hidden");
} else {
  addBookContainer.style.display = "block";
  addAudioContainer.style.display = "block";
  loggedInHeadings.classList.add("hidden");
}