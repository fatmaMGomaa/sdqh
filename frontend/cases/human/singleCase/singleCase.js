const token = getLocalStorageItem("token");
let caseId = getLocalStorageItem("caseId");
const caseType = getLocalStorageItem("caseType");
let theCase;
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
const container = document.querySelector('.container')
axios
    .get(`http://localhost:8080/singleCase/${caseId}?caseType=${caseType}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        theCase = response.data.case;
        console.log(theCase);
        if (!theCase) {
            container.innerHTML = "لا يوجد حالة لعرضها"
        } else {
            let imagePath = `http://localhost:8080/${theCase.image}`;
            container.innerHTML = 
            `<div class="right">
                <img src=${imagePath} alt=${theCase["name"] || theCase["species"]}/>
            </div>
            <div class="left">
                <div class="top">
                    <h2>${ theCase["name"] || theCase["species"]}</h2>
                    <p class="date">تم إضافته: <time>${ theCase["createdAt"].split('T')[0]}</time></p>
                </div>
                <div class="middle">
                    <p>${ theCase["description"]}</p>
                    <ul>
                        <li>${ theCase["address"]}</li>
                        <li>${ theCase["uniqueSign"]}</li>
                        <li>${ theCase["area"]}</li>
                    </ul>
                </div>
                <div class="bottom">
                    <ul>
                        <li>رقم التليفون: ${ theCase["phone"]}</li>
                        <li>للتواصل مع فاعل الخير ${ theCase["user"]["firstName"]}<button type="button" id=${theCase["id"]}>محادثة</button></li>
                    </ul>
                </div>
            </div>`
        }
        const caseButton = document.querySelector('button')

        caseButton.addEventListener('click', (e) => {
            caseId = e.target.id
            console.log(caseId)
            saveToLocalStorage("caseId", caseId)
            theCase["name"] ? saveToLocalStorage("caseType", "human") : saveToLocalStorage("caseType", "animal")
        })
    })
    .catch(error => {
        console.log(error);
        alert("something went wrong")
    });

