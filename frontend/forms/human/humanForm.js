const location = getLocalStorageItem("location");
const user = getLocalStorageItem("user");
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
let data, image;
const form = document.getElementById('human')
const imageFile = document.getElementById('image')
imageFile.addEventListener("change", (e) => {
    image = e.target.files[0]
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const city = document.getElementById('city').value
    const address = document.getElementById('address').value
    const uniqueSign = document.getElementById('unique-sign').value
    const description = document.getElementById('description').value
    const mobileNumber = document.getElementById('mobile-number').value
    const lat = location.lat;
    const lng = location.lng;
    const userId = user.id;

    let data = new FormData();
    data.append("name", name);
    data.append("city", city);
    data.append("address", address);
    data.append("uniqueSign", uniqueSign);
    data.append("description", description);
    data.append("mobileNumber", mobileNumber);
    data.append("lat", lat);
    data.append("lng", lng);
    data.append("userId", userId);
    if (image) {
        data.append("file", image);
    }

    axios
        .post("http://localhost:8080/addCase?caseType='human'", data, {
            headers: {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
        })
        .then(function (response) {
            data = response.data;
            localStorage.clear();
            window.location.replace(baseURL + "/index/human/index.html");
            alert("case was added successfully")
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });
})