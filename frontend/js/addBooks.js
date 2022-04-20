const bookForm = document.querySelector("#bookForm");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRating = document.querySelector("#bookRating");
const bookCover = document.querySelector("#bookCover");
const bookGenre = document.querySelector("#bookGenre");
const addBookContainer = document.querySelector("#addBookContainer");
const addAudioContainer = document.querySelector("#addAudioContainer");
const loggedInHeadings = document.querySelector("#loggedInHeadings");

let loggedInUserObj = sessionStorage.getItem("loggedInUser");

const addBook = async () => {
  loggedInUserObj = JSON.parse(loggedInUserObj);
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
                  genres: [bookGenre.value],
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

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook()
})

const audioForm = document.querySelector("#audioForm");
const audioTitle = document.querySelector("#audioTitle");
const audioRelease = document.querySelector("#audioRelease");
const audioLength = document.querySelector("#audioLength");
const audioRating = document.querySelector("#audioRating");
const audioCover = document.querySelector("#audioCover");
const audioGenre = document.querySelector("#audioGenre");

const addAudio = async () => {
  loggedInUserObj = JSON.parse(loggedInUserObj);
  let image = audioCover.files;
  let imgData = new FormData();
  imgData.append('files', image[0]);
  
  axios.post("http://localhost:1337/api/upload", imgData)
    .then(res => {
      let imageId = res.data[0].id;
      axios.post("http://localhost:1337/api/audiobooks", {
              data: {
                  title: audioTitle.value,
                  releaseDate: audioRelease.value,
                  lengthMin: audioLength.value,
                  rating: audioRating.value,
                  bookCover: imageId,
                  genres: [audioGenre.value],
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

audioForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addAudio()
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