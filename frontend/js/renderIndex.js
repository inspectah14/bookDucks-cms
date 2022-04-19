const itemList = document.querySelector("#itemList");

let onRender = async () => {
  let books = await fetchData(`http://localhost:1337/api/books?populate=%2A`);
  let audiobooks = await fetchData(`http://localhost:1337/api/audiobooks?populate=%2A`);

  books.map((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList = "book-container";
    let bookTextContainer = document.createElement("div");
    bookTextContainer.classList = "book-text-container";
    let itemHeading = document.createElement("h3");
    let bookTitle = document.createElement("p");
    let bookAuth = document.createElement("p");
    let bookPages = document.createElement("p");
    let bookRating = document.createElement("p");
    let bookCoverImg = document.createElement("img");
    bookCoverImg.classList = "book-cover";
    let {title, author, pages, rating, genres, user, bookCover} = book.attributes;

    itemHeading.innerHTML = "Book";
    bookTitle.innerHTML = `<strong>Title:</strong> ` + title;
    bookAuth.innerHTML = `<strong>Author:</strong> ` + author;
    bookPages.innerHTML = `<strong>Page Numbers:</strong> ` + pages;
    bookRating.innerHTML = `<strong>Rating:</strong> ${rating}/10`;

    if(bookCover.data) {
      bookCoverImg.src = "http://localhost:1337" + bookCover.data.attributes.url;
    }

    bookTextContainer.append(itemHeading, bookTitle, bookAuth, bookPages, bookRating);

    genres.data.map((genre) => {
      let bookGenre = document.createElement("p");
      bookGenre.innerHTML = `<strong>Genres:</strong> ${genre.attributes.genre}`;
      bookTextContainer.append(bookGenre);
    })

    let bookUser = document.createElement("p");
    bookUser.innerHTML = `<strong>Book Owner:</strong> ${user.data.attributes.username} (${user.data.attributes.email})`;
    bookTextContainer.append(bookUser);



    bookContainer.append(bookTextContainer, bookCoverImg);
    itemList.appendChild(bookContainer);
  });

  audiobooks.map((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList = "book-container";
    let bookTextContainer = document.createElement("div");
    bookTextContainer.classList = "book-text-container";
    let itemHeading = document.createElement("h3");
    let bookTitle = document.createElement("p");
    let bookRelease = document.createElement("p");
    let bookLength = document.createElement("p");
    let bookRating = document.createElement("p");
    let bookCoverImg = document.createElement("img");
    bookCoverImg.classList = "book-cover";
    let {title, releaseDate, lengthMin, rating, genres, user, bookCover} = book.attributes;

    itemHeading.innerHTML = "Audiobook";
    bookTitle.innerHTML = `<strong>Title:</strong> ` + title;
    bookRelease.innerHTML = `<strong>Release Date:</strong> ` + releaseDate;
    bookLength.innerHTML = `<strong>Length:</strong> ${lengthMin} minutes`;
    bookRating.innerHTML = `<strong>Rating:</strong> ${rating}/10`;

    if(bookCover.data) {
      bookCoverImg.src = "http://localhost:1337" + bookCover.data.attributes.url;
    }

    bookTextContainer.append(itemHeading, bookTitle, bookRelease, bookLength, bookRating);

    genres.data.map((genre) => {
      let bookGenre = document.createElement("p");
      bookGenre.innerHTML = `<strong>Genres:</strong> ${genre.attributes.genre}`;
      bookTextContainer.append(bookGenre);
    })

    let bookUser = document.createElement("p");
    bookUser.innerHTML = `<strong>Book Owner:</strong> ${user.data.attributes.username} (${user.data.attributes.email})`;
    bookTextContainer.append(bookUser);

    bookContainer.append(bookTextContainer, bookCoverImg);
    itemList.appendChild(bookContainer);
  });
}

onRender();