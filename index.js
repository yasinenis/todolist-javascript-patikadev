let taskCount = localStorage.getItem("taskCount") ? localStorage.getItem("taskCount") : 0;
console.log(`Başlangıctaki gorev sayisi : ${taskCount}`)

// Local Storage
const appState = {
    taskList: [],
    statusList: [],
    taskCount: 0
};

let userListDOM = document.querySelector("#userList")

loadAppState()
loadPreviousPage()

function saveAppState() {
    localStorage.setItem("todoAppState", JSON.stringify({
        taskList: appState.taskList,
        statusList: appState.statusList,
        taskCount: appState.taskCount
    }))
}

function loadAppState() {
    const savedState = JSON.parse(localStorage.getItem("todoAppState"))
    if (savedState) {
        appState.taskList = savedState.taskList || [];
        appState.statusList = savedState.statusList || [];
        appState.taskCount = savedState.taskCount || 0;
        console.log(`appState yuklendi, gorevler: ${appState.taskList}, status: ${appState.statusList}, taskCount: ${appState.taskCount}`)
    } else {
        console.log("savedState yok veya yuklenemedi!")
    }
}

// adding task
let taskInputDOM = document.querySelector("#buttonId");
taskInputDOM.addEventListener("click", formHandler);
let alertDOM = document.querySelector("#alert");

function formHandler(event) {
    event.preventDefault();
    // buradan sonrası keyfekeder
    const TASK_NAME = document.querySelector("#taskInput");

    if (TASK_NAME.value) { // veri var ise
        addItem(TASK_NAME.value);
        TASK_NAME.value = ""; // veri gonderdikten sonra sıfırladık
    }
    else {
        alert("Bir hata yapıyorsun! Lütfen boş bırakmayınız.");
    }
}


function updateLiIndexes() {
    const allLi = userListDOM.querySelectorAll("li");
    for (let i = 0; i < allLi.length; i++) {
        allLi[i].setAttribute("data-index", i);
    }
}

function addItem(taskName) {
    let liDOM = document.createElement("li");
    liDOM.setAttribute("data-index", taskCount)
    liDOM.innerHTML =
        `
        <div1>
            <i class="fa-regular fa-circle"></i>
        </div1>
        <div2>
            <span>${taskName}</span>
        </div2>
        <div3>
            <i class="del-btn fa-solid fa-square-xmark"></i>
        </div3>
    `
    liDOM.classList.add("d-flex")
    userListDOM.append(liDOM);
    appState.taskList[taskCount] = taskName
    appState.statusList[taskCount] = false;
    taskCount++;
    appState.taskCount = taskCount;
    updateLiIndexes()
    saveAppState()
    localStorage.setItem("taskCount", taskCount);
}

function loadPreviousPage() {
    for (i = 0; i < appState.taskCount; i++) {
        let liDOM = document.createElement("li")
        liDOM.setAttribute("data-index", i)
        liDOM.innerHTML =
            `
            <div1>
                <i class="${appState.statusList[i] ? "fa-solid" : "fa-regular"} fa-circle${appState.statusList[i] ? "-check fa-solid" : ""}"></i>
            </div1>
            <div2>
                <span>${appState.taskList[i]}</span>
            </div2>
            <div3>
                <i class="del-btn fa-solid fa-square-xmark"></i>
            </div3>
        `
        if (appState.statusList[i] == true) {
            liDOM.classList.add("completed")
        }
        // underlying
        let spanDOM = liDOM.querySelector("span")
        if (appState.statusList[i]) {
            spanDOM.classList.add("underlying");
        }
        //spanDOM.classList.toggle(`${appState.statusList[i] ? "underlying" : ""}`);

        liDOM.classList.add("d-flex");
        userListDOM.append(liDOM);
    }
}

// deleting task
userListDOM.addEventListener("click", touchHandler)

function touchHandler(event) {

    if (event.target.closest("li")) {
        let liElement = event.target.closest("li")
        let index = parseInt(liElement.getAttribute("data-index"));


        if (event.target.classList.contains("del-btn")) {
            liElement.remove();
            // localStorage
            appState.taskList.splice(index, 1)
            appState.statusList.splice(index, 1)
            taskCount--;
            appState.taskCount = taskCount;
            updateLiIndexes()
            saveAppState();
            console.log(`Kalan Task: ${taskCount}`)
            localStorage.setItem("taskCount", taskCount)    // eski taskCount
            return
        }

        // mark as DONE
        const isCompleted = liElement.classList.toggle("completed")
        // local Storage
        appState.statusList[index] = isCompleted;
        updateLiIndexes();
        saveAppState();
        // tick symbol
        const iconElement = liElement.querySelector("i");
        iconElement.classList.toggle("fa-circle-check")
        iconElement.classList.toggle("fa-circle")
        iconElement.classList.toggle("fa-solid")
        iconElement.classList.toggle("fa-regular")

        let spanElement = liElement.querySelector("span");
        if (spanElement) {
            spanElement.classList.toggle("underlying");
        }

        saveAppState();
        updateLiIndexes()
    }


}

