const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("login.html");
})

const regUsername = document.querySelector("#regUsername");
const regEmail = document.querySelector("#regEmail");
const regPassword = document.querySelector("#regPassword");

const clearRegFields = () => {
  regUsername.value = "";
  regEmail.value = "";
  regPassword.value = "";
}

const regUser = async () => {
  let response = await axios.post("http://localhost:1337/api/auth/local/register",
  {
      username: regUsername.value,
      email: regEmail.value,
      password: regPassword.value
  });

  const token = response.data.jwt;
  const user = response.data.user;
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  clearRegFields();
}

const regForm = document.querySelector("#regForm");

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  regUser();
  location.reload();
  window.location.replace("login.html");
})