const token = getLocalStorageItem("token");
let caseId = getLocalStorageItem("caseId");
const caseType = getLocalStorageItem("caseType");
const user = getLocalStorageItem("user");

let theCase, comments;
const baseURL = "file:///home/fgomaa/Desktop/sdqh/frontend";
const container = document.querySelector('.container');
axios
    .get(`http://localhost:8080/singleCase/${caseId}?caseType=${caseType}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        theCase = response.data.case;
        comments = theCase.comments;
        console.log(comments);
        if (!theCase) {
            container.innerHTML = "<h1>لا يوجد حالة لعرضها</h1>"
        } else {
            let imagePath = `http://localhost:8080/${theCase.image}`;
            container.innerHTML = 
            `<div class="content">
                <div class="right">
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
                            <li>فاعل الخير: ${ theCase["user"]["firstName"]} ${theCase["user"]["lastName"]}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="comment__container">
                <div>
                    <h2>التعليقات</h2>
                </div>
                <div>
                    <form method="POST" name="comment" id="comment-form">
                        <textarea rows="4" placeholder="أكتب تعليقك...." id="comment-content"></textarea>
                        <button type="submit">أرسل</button>
                    </form>
                </div>
                <div id="other-comments"></div>
            </div>`
            if(!token){
                alert("please log in first");
            }else {
                const commentForm = document.querySelector('#comment-form');
                commentForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const comment = document.getElementById('comment-content').value

                    axios.post("http://localhost:8080/addComment", {
                        comment,
                        userId: user.id,
                        caseType,
                        caseId
                    })
                        .then(function (response) {
                            location.reload();
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert(error.response.data.message)
                        });
                })
            }
            
            if (comments.length > 0) {
                const caseComments = document.querySelector('#other-comments')
                let commentImage;
                for (var i = 0; i < comments.length; i++){
                    commentImage = `http://localhost:8080/${comments[i]['user']['image']}`;
                    console.log(commentImage)
                    var commentDiv = document.createElement("div");
                    commentDiv.className = "single-comment";
                    commentDiv.innerHTML =
                        `<div>
                            <img src=${commentImage} alt=${comments[i]['user']['firstName']} />
                        </div>
                        <div>
                            <p><span>${comments[i]['user']['firstName']}:</span>   ${comments[i]['content']}</p>
                            <p>منذ <time>${comments[i]["createdAt"].split('T')[0]}</time></p>
                        </div>`

                    caseComments.appendChild(commentDiv);
                }
            }
        }
    })
    .catch(error => {
        console.log(error);
        alert(error.response.message)
    });

