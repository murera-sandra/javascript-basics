let tasks =[];
let currentFilter = "all";

function handleKey(e){
    if (e.key ==="Enter") {
        addTask();
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    if(input.value.trim()==="") return;

    tasks.push({
        text:input.value,
        completed:false
    });
    input.value="";
    render();
}
   

function render(){
    const list = document.getElementById("taskList");
    const count= document.getElementById("count");

    if(!list || !count)return;

    list.innerHTML ="";

    let filteredTasks = tasks.filter(task => {
        if(currentFilter ==="active") return !task.completed;
        if(currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task) => {
        const originalIndex=tasks.indexOf(task);
        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML=`
        <input type="checkbox" ${task.completed?"checked":""} onchange="toggleTask(${originalIndex})">
        <span>${task.text}</span>
        <span class ="delete" onclick="deleteTask(${originalIndex})">×</span>
        `;

        list.appendChild(li);
    });

    const activeCount = tasks.filter(t => !t.completed).length;
    count.textContent =`${activeCount} items left`;
}

function toggleTask(index){
    tasks[index].completed =!tasks[index].completed;
    render();
}
function deleteTask(index){
   tasks.splice(index,1);
   render();
}

function filterTasks(type){
    currentFilter =type;
    render();
}



