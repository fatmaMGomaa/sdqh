const token = getLocalStorageItem("token");
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
let cases = [];
const container = document.querySelector('.container')
axios
    .get("http://localhost:8080/allCases?caseType=human", {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        cases = response.data.cases;
        console.log(cases);
        if(cases.length === 0){
            container.innerHTML = "لا يوجد حالات لعرضها"
        }else {
            let imagePath;
            for (var i = 0; i < cases.length; i++) {
                imagePath = `http://localhost:8080/${cases[i]["image"]}`
                var div = document.createElement("div");
                div.className = "content";
                div.innerHTML =
                    `<div class="right">
                <img src=${imagePath} alt=${cases[i]["name"]} />
            </div>
            <div class="left">
                <div class="top">
                    <h2>${ cases[i]["name"]}</h2>
                    <p class="date">تم إضافته: <time>${ cases[i]["createdAt"].split('T')[0]}</time>، ${cases[i]["area"]}</p>
                </div>
                <div class="middle">
                    <p>${ cases[i]["description"]}</p>
                </div>
                <div class="bottom">
                    <button type="button" id=${ cases[i]["id"]}>المزيد</button>
                </div>
            </div>`;
                container.appendChild(div);
            }
        }
        const caseButton = document.querySelector('button')

        caseButton.addEventListener('click', (e) => {
            caseId = e.target.id
            console.log(caseId)
            saveToLocalStorage("caseId", caseId)
            saveToLocalStorage("caseType", "human")
        })
    })
    .catch(error => {
        console.log(error);
        alert("something went wrong")
    });

