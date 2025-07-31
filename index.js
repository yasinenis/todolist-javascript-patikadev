taskCount= document.querySelectorAll("li").length;
console.log(`Başlangıctaki gorev sayisi : ${taskCount}`)

// adding task
let taskInputDOM = document.querySelector("#buttonId");
taskInputDOM.addEventListener("click", formHandler);
let alertDOM = document.querySelector("#alert");

function formHandler(event) {
    event.preventDefault();
    // buradan sonrası keyfekeder
    const TASK_NAME = document.querySelector("#taskInput");

    if (TASK_NAME.value) { // veri var ise
        TASK_ID = taskCount
        TASK_ID = TASK_ID + 1;
        addItem(TASK_NAME.value, TASK_ID);
        TASK_NAME.value = ""; // veri gonderdikten sonra sıfırladık
    }
    else {
        alert("Bir hata yapıyorsun! Lütfen boş bırakmayınız.");
    }
}

let userListDOM = document.querySelector("#userList")

function addItem(taskName, task_id) {
    let liDOM = document.createElement("li");
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
    taskCount++;
}

// deleting task
userListDOM.addEventListener("click", touchHandler)

function touchHandler(event) {
    if(event.target.classList.contains("del-btn")) {
        event.target.closest("li").remove();
        taskCount--;
        console.log(`Kalan Task: ${taskCount}`)
    }
    // mark as DONE
    if(event.target.closest("li")) {
        liElement = event.target.closest("li")
        liElement.classList.toggle("completed")
        // tick symbol
        const iconElement = liElement.querySelector("i");
        iconElement.classList.toggle("fa-circle-check")
        iconElement.classList.toggle("fa-circle")
        iconElement.classList.toggle("fa-solid")
        iconElement.classList.toggle("fa-regular")


        
        
    }

    let spanElement = liElement.querySelector("span")
    if(spanElement){
        spanElement.classList.toggle("underlying");
    }
    //spanElement = event.target.closest("span")
    //spanElement.classList.toggle("underlying")
} 

