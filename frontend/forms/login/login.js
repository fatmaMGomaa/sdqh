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
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.replace(baseURL+"/landingPage/landing.html");
        })
        .catch(function (error) {
            console.log(error);
        });
})