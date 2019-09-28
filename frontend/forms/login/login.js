const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend"
const form = document.getElementById('login')
let data;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.post("http://localhost:8080/login", {
        email,
        password
    })
        .then(function (response) {
            data = response.data
            localStorage.clear();
            saveToLocalStorage("token", data.token)
            saveToLocalStorage("user", data.user)
            window.location.replace(baseURL+"/landingPage/landing.html");
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });
})
const signoutButton = document.querySelector('#signout');
signoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeLocalStorageItem('user');
    removeLocalStorageItem('token');
    alert('you have signed out successfully')
    window.location.replace(baseURL + "/landingPage/landing.html");
})