const token = getLocalStorageItem("token");
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
let cases = [];
const container = document.querySelector('.container')
axios
    .get("http://localhost:8080/allCases?caseType=animal", {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        cases = response.data.cases;
        console.log(cases);
        if (cases.length === 0) {
            container.innerHTML = "<h2>لا يوجد حالات لعرضها</h2>"
        } else {
            let imagePath;
            for (var i = 0; i < cases.length; i++) {
                imagePath = `http://localhost:8080/${cases[i]["image"]}`
                var div = document.createElement("div");
                div.className = "content";
                div.innerHTML =
                    `<div class="right">
                        <img src=${imagePath} alt=${cases[i]["species"]} />
                    </div>
                    <div class="left">
                        <div class="top">
                            <h2>${ cases[i]["species"]}</h2>
                            <p class="date">تم إضافته: <time>${ cases[i]["createdAt"].split('T')[0]}</time>، ${cases[i]["area"]}</p>
                        </div>
                        <div class="middle">
                            <p>${ cases[i]["description"].substring(0, 120)}...</p>
                        </div>
                        <div class="bottom">
                            <button type="button" id=${ cases[i]["id"]}>المزيد</button>
                        </div>
                    </div>`;
                container.appendChild(div);
            }
            const casesButton = document.querySelectorAll('button')
            casesButton.forEach((caseButton) => {
                caseButton.addEventListener('click', (e) => {
                    caseId = e.target.id
                    console.log(caseId)
                    saveToLocalStorage("caseId", caseId)
                    saveToLocalStorage("caseType", "animal")
                    window.location.replace(baseURL + `/cases/animal/singleCase/singleCase.html`);
                })
            })
        }
    })
    .catch(error => {
        console.log(error);
        alert("something went wrong")
    });