const loginAnchor = document.querySelector("#loginAnchor");
const profileAnchor = document.querySelector("#profileAnchor");
const logOutBtn = document.querySelector("#logOutBtn");

if(sessionStorage.getItem("token")){
  loginAnchor.classList.add("hidden");
  profileAnchor.classList.remove("hidden");
  logOutBtn.classList.remove("hidden");
}

logOutBtn.addEventListener("click", (e) => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("loggedInUser");
  location.reload();
})