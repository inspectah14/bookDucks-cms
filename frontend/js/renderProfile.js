const profileInfo = document.querySelector("#profileInfo");

let profileRender = async () => {
  loggedInUserObj = JSON.parse(loggedInUserObj);
  let profileCreatedAt = loggedInUserObj.createdAt;
  profileCreatedAt.toString();
  let dateFormatted = profileCreatedAt.slice(0, 10);
  let profileContainer = document.createElement("div");
  profileContainer.classList = "profile-container"
  profileContainer.innerHTML += `
    <p><strong>Profile Information</strong></p>
    <p>Username: ${loggedInUserObj.username}</p>
    <p>Email: ${loggedInUserObj.email}</p>
    <p>User ID: ${loggedInUserObj.id}</p>
    <p>Profile created: ${dateFormatted}</p>
  `
  profileInfo.appendChild(profileContainer);
}

const productList = document.querySelector("#productList");

let productRender = async (user) => {
  let books = await fetchData(`http://localhost:1337/api/books?filters[userId][$eq]=${user}&populate=*`);
  let audiobooks = await fetchData(`http://localhost:1337/api/audiobooks?filters[userId][$eq]=${user}&populate=*`);

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

    let genreContainer = document.createElement("div");
    genreContainer.innerHTML = `<p><strong>Genres:</strong><p>`;

    genres.data.map((genre) => {
      genreContainer.innerHTML += `<p>${genre.attributes.genre}</p>`;
      bookTextContainer.append(genreContainer);
    })

    let bookUser = document.createElement("p");
    bookUser.innerHTML = `<strong>Book Owner:</strong> ${user.data.attributes.username} (${user.data.attributes.email})`;
    bookTextContainer.append(bookUser);



    bookContainer.append(bookTextContainer, bookCoverImg);
    productList.appendChild(bookContainer);
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

    let genreContainer = document.createElement("div");
    genreContainer.innerHTML = `<p><strong>Genres:</strong><p>`;

    genres.data.map((genre) => {
      genreContainer.innerHTML += `<p>${genre.attributes.genre}</p>`;
      bookTextContainer.append(genreContainer);
    })

    let bookUser = document.createElement("p");
    bookUser.innerHTML = `<strong>Book Owner:</strong> ${user.data.attributes.username} (${user.data.attributes.email})`;
    bookTextContainer.append(bookUser);

    bookContainer.append(bookTextContainer, bookCoverImg);
    productList.appendChild(bookContainer);
  });
}

const loginMainHeading = document.querySelector("#loginMainHeading");

if(sessionStorage.getItem("token")){
  profileRender();
  productRender(loggedInUserObj.id);
  loginMainHeading.style.display = "none";
}