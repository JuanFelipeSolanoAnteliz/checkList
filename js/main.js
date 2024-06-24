import { getAllTask } from "./module/app.js";
import { getReadyTasks } from "./components/readyTask.js";
import { getOnholdTasks } from "./components/onHoldTasks.js";
import { postTask } from "./module/addTAsk.js";
import { deleteTask } from "./module/deleteTAsk.js";
import { markAsReady } from "./module/markAsReady.js";
import { taskById } from "./module/taskById.js";


const url = `https://667788a1145714a1bd74f785.mockapi.io/tasks`
let data = await getAllTask();



// await postTask({task:asd});

let onHold__task = document.querySelector("#onHold__task");
onHold__task.innerHTML = await getOnholdTasks(data);

let ready__Task = document.querySelector("#ready__Task");
ready__Task.innerHTML = await getReadyTasks(data);

let input__search = document.querySelector("#input__search")
let add__button = document.querySelector("#add__button");

// Añadir neva tarea al JSON ----------------------------------

let newtask;
input__search.addEventListener('input', async(inputTask)=>{
    
    newtask = inputTask.target.value;
    console.log(newtask)
});

const printNewTask =async (data)=>{
    let lastTask;
    let plantilla;
    // console.log(data)
    lastTask = data.at(-1);
    plantilla = /*html*/`
    <article id="${lastTask.id++}" class="to__do__task">
        <p>${newtask}</p>
        <div class="to__do__buttons">
            <div class="check__to__do">
                <img src="storage/img/checkmark.svg" alt="">
            </div>
            <div class="trash__to__do">
                <img src="storage/img/trash.svg" alt="">
            </div>
        </div>
    </article>`;

    return plantilla;
}

add__button.addEventListener('click', async(e)=>{
    let valueTask = newtask;
    console.log(valueTask);
    
    let dataOfNewTask = {
        task:valueTask,
        status:"On hold"
    }
    await postTask(dataOfNewTask)
    
    onHold__task.innerHTML += await printNewTask(data)

});
// ---------------------------------------------------------------


// event to delete ---------------------------------------------------
let list__trash__button = document.querySelectorAll("#trash__button");
let listDomOnhold = document.querySelectorAll(".to__do__task");
// console.log(trash__button);

list__trash__button.forEach(element => {
    // console.log(element)
    element.addEventListener('click',async(article)=>{
        let closestArticle = article.target.closest('article')
        // console.log(closestArticle)
        let idToDelete = closestArticle.id
        closestArticle.remove()
        await deleteTask(idToDelete);
    })
});

// event to mark as ready ---------------------------------------------

let check__to__do = document.querySelectorAll("#check__to__do")
console.log(check__to__do)

const printNewReady = async(data)=>{
    let plantilla='';
    let lastTask = data.at(-1);
    plantilla+=/*html*/`
    <article class="mark__task">
        <p>${text}</p>
        <div class="mark__buttoms">
            <div class="check__mark">
                <img src="storage/img/checkmark _mark.svg" alt="">
            </div>
            <div class="trash__mark">
                <img src="storage/img/trash_mark.svg" alt="">
            </div>
        </div>  
    </article>`;
    return plantilla;
}


check__to__do.forEach(element => {
    element.addEventListener('click',async(article)=>{
        let closestArticle = article.target.closest('article');
        console.log(closestArticle)
        
        let idToMarkAsReady = closestArticle.id;
        let taskContent = await taskById(closestArticle.id);
        let text = taskContent.task;
        
        const printNewReady = async(data)=>{
            let plantilla='';
            let lastTask = data.at(-1);
            plantilla+=/*html*/`
            <article class="mark__task">
                <p>${text}</p>
                <div class="mark__buttoms">
                    <div class="check__mark">
                        <img src="storage/img/checkmark _mark.svg" alt="">
                    </div>
                    <div class="trash__mark">
                        <img src="storage/img/trash_mark.svg" alt="">
                    </div>
                </div>  
            </article>`;
            return plantilla;
        }
        
        await markAsReady(idToMarkAsReady);
        closestArticle.remove()
        ready__Task.innerHTML += await printNewReady(data)
    })
});
// ------------------------------------------------------------

