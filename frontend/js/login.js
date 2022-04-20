const loginFormContainer = document.querySelector("#loginFormContainer");
const loginForm = document.querySelector("#loginForm");
const regBtn = document.querySelector("#regBtn");
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");

let clearFields = () => {
  userName.value = "";
  password.value = "";
}

let loggedInUserObj = sessionStorage.getItem("loggedInUser");

let login = async () => {
  try {
    let response = await axios.post("http://localhost:1337/api/auth/local",
    {
      identifier: userName.value,
      password: password.value,
    });
    const token = response.data.jwt;
    const user = response.data.user;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    clearFields();
    location.reload();
  }
  catch(error) {
    alert("You wrongly entered your login information. Please try again.");
    clearFields();
    location.reload();
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
})

regBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("register.html");
})

if(sessionStorage.getItem("token")){
  loginFormContainer.style.display = "none";
}