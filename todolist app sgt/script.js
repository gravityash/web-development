let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function addTask(){

const text=document.getElementById("taskInput").value;
const date=document.getElementById("dueDate").value;
const priority=document.getElementById("priority").value;

if(text==="") return;

tasks.push({

text,
date,
priority,
completed:false

});

document.getElementById("taskInput").value="";

save();
renderTasks();

}

function renderTasks(){

const list=document.getElementById("taskList");
const search=document.getElementById("search").value.toLowerCase();

list.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

if(!task.text.toLowerCase().includes(search)) return;

if(task.completed) completed++;

const li=document.createElement("li");

li.classList.add(`priority-${task.priority}`);

if(task.completed){

li.classList.add("completed");

}

li.innerHTML=`

<div class="task-info" onclick="toggleTask(${index})">

<span>${task.text}</span>

<div class="task-date">${task.date || ""}</div>

</div>

<button onclick="deleteTask(${index})">Delete</button>

`;

list.appendChild(li);

});

document.getElementById("total").innerText=tasks.length;
document.getElementById("completed").innerText=completed;

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

save();
renderTasks();

}

function deleteTask(index){

tasks.splice(index,1);

save();
renderTasks();

}

function clearAll(){

tasks=[];

save();
renderTasks();

}

document.getElementById("themeToggle").onclick=function(){

document.body.classList.toggle("dark");

};

renderTasks();